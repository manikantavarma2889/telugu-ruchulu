import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, Order, UserRole } from '../types';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

import { CustomerProfile } from '../types';

interface StoreContextType {
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    isAdminLoggedIn: boolean;
    setIsAdminLoggedIn: (isLoggedIn: boolean) => void;

    // Customer Auth
    customerProfile: CustomerProfile | null;
    isCustomerLoggedIn: boolean;
    logoutCustomer: () => void;

    menuItems: MenuItem[];
    addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
    updateMenuItem: (item: MenuItem) => void;
    deleteMenuItem: (id: number) => void;
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: string) => void;
    markNewOrdersAsRead: () => void;
    newOrdersCount: number;
    resetMenuToDefaults: () => void;
    location: string;
    setLocation: (location: string) => void;
    detectLocation: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [userRole, setUserRole] = useState<UserRole>('customer');
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // Customer Auth State
    const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
    const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

    const [location, setLocation] = useState<string>(() => {
        return localStorage.getItem('userLocation') || 'Chennai';
    });

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [newOrdersCount, setNewOrdersCount] = useState(0);

    // Initial Fetch from Supabase
    useEffect(() => {
        fetchMenu();
        fetchOrders();

        // 1. Initial Auth Check
        checkUserSession();

        // 2. Auth State Listener
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    await fetchAndSetCustomerProfile(session.user);
                } else if (event === 'SIGNED_OUT') {
                    setCustomerProfile(null);
                    setIsCustomerLoggedIn(false);
                }
            }
        );

        // Subscribe to real-time order changes
        const ordersSubscription = supabase
            .channel('orders-realtime')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
                const newDbOrder = payload.new;
                const newOrder = mapDbOrderToOrder(newDbOrder);
                setOrders(prev => [newOrder, ...prev]);
                setNewOrdersCount(count => count + 1);
                toast.info(`New order received! #${newOrder.id.slice(0, 8)}`);
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, payload => {
                const updatedOrder = mapDbOrderToOrder(payload.new);
                setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(ordersSubscription);
            authListener.subscription.unsubscribe();
        };
    }, []);

    const checkUserSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            await fetchAndSetCustomerProfile(session.user);
        }
    };

    const fetchAndSetCustomerProfile = async (user: any) => {
        console.log("Fetching profile for user ID:", user.id);

        try {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Profile fetch timed out.")), 10000)
            );

            const profilePromise = supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            const { data, error } = await Promise.race([profilePromise, timeoutPromise]) as any;

            if (data) {
                const newProfile = {
                    id: user.id,
                    email: user.email,
                    name: data.name,
                    phone: data.phone,
                    address: data.address
                };
                setCustomerProfile(newProfile);
                setIsCustomerLoggedIn(true);
            } else if (error) {
                console.error('Profile fetch error:', error);
                // Profile doesn't exist or DB failed. Don't use a dummy profile.
                toast.error("Profile not found. Please create a new account.");
                await supabase.auth.signOut();
                setCustomerProfile(null);
                setIsCustomerLoggedIn(false);
            }
        } catch (err: any) {
            console.error("Profile fetch exception:", err);
            toast.error(err.message || "Network error fetching profile. Please login again.");
            await supabase.auth.signOut();
            setCustomerProfile(null);
            setIsCustomerLoggedIn(false);
        }
    };

    const logoutCustomer = async () => {
        await supabase.auth.signOut();
        setCustomerProfile(null);
        setIsCustomerLoggedIn(false);
        toast.success("Logged out successfully");
    };


    const fetchMenu = async () => {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .order('name');

        if (error) {
            toast.error('Failed to fetch menu');
            return;
        }
        // Map DB types to our MenuItem interface (rating DECIMAL to number, snake_case to camelCase)
        setMenuItems(data.map(item => ({
            ...item,
            image: item.image_url,
            isVeg: item.is_veg,
            rating: Number(item.rating)
        })) as MenuItem[]);
    };

    const mapDbOrderToOrder = (dbOrder: any): Order => ({
        id: dbOrder.id,
        customerName: dbOrder.customer_name,
        customerPhone: dbOrder.customer_phone,
        items: dbOrder.items,
        total: Number(dbOrder.total),
        status: dbOrder.status,
        orderTime: dbOrder.created_at,
        deliveryAddress: dbOrder.address,
        paymentMethod: dbOrder.payment_method,
        isNew: dbOrder.is_new
    });

    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Failed to fetch orders');
            return;
        }
        setOrders(data.map(mapDbOrderToOrder));
    };

    const detectLocation = () => {
        if ("geolocation" in navigator) {
            toast.info("Detecting your location...", { duration: 2000 });
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    if (lat > 16) {
                        setLocation("Vishakapatnam");
                        toast.success("Location set to Vishakapatnam");
                    } else {
                        setLocation("Chennai");
                        toast.success("Location set to Chennai");
                    }
                },
                (error) => {
                    toast.error("Geolocation failed. Please select manually.");
                    console.error("Location error:", error);
                }
            );
        } else {
            toast.error("Geolocation is not supported by your browser.");
        }
    };

    const addMenuItem = async (newItemData: Omit<MenuItem, 'id'>) => {
        // Map frontend fields (isVeg, image) to DB columns (is_veg, image_url)
        const dbItem = {
            name: newItemData.name,
            description: newItemData.description,
            price: newItemData.price,
            category: newItemData.category,
            image_url: newItemData.image,
            is_veg: newItemData.isVeg,
            rating: newItemData.rating
        };

        const { data, error } = await supabase
            .from('menu_items')
            .insert([dbItem])
            .select();

        if (error) {
            console.error('Supabase Error:', error);
            toast.error(`Failed to add item: ${error.message}`);
            return;
        }

        // Map back to frontend type
        const addedItem: MenuItem = {
            ...data[0],
            image: data[0].image_url,
            isVeg: data[0].is_veg,
            rating: Number(data[0].rating)
        };

        setMenuItems(prev => [...prev, addedItem]);
        toast.success(`${newItemData.name} added successfully!`);
    };

    const updateMenuItem = async (updatedItem: MenuItem) => {
        // Map frontend fields to DB columns
        const dbItem = {
            name: updatedItem.name,
            description: updatedItem.description,
            price: updatedItem.price,
            category: updatedItem.category,
            image_url: updatedItem.image,
            is_veg: updatedItem.isVeg,
            rating: updatedItem.rating
        };

        const { error } = await supabase
            .from('menu_items')
            .update(dbItem)
            .eq('id', updatedItem.id);

        if (error) {
            console.error('Supabase Error:', error);
            toast.error(`Failed to update item: ${error.message}`);
            return;
        }
        setMenuItems(prev => prev.map(item =>
            item.id === updatedItem.id ? updatedItem : item
        ));
        toast.success(`${updatedItem.name} updated successfully!`);
    };

    const deleteMenuItem = async (id: number) => {
        const { error } = await supabase
            .from('menu_items')
            .delete()
            .eq('id', id);

        if (error) {
            toast.error('Failed to remove item');
            return;
        }
        setMenuItems(prev => prev.filter(item => item.id !== id));
        toast.success('Item removed successfully!');
    };

    const addOrder = async (newOrder: Order) => {
        const dbOrder = {
            id: newOrder.id,
            user_id: newOrder.userId,
            customer_name: newOrder.customerName,
            customer_phone: newOrder.customerPhone,
            items: newOrder.items,
            total: newOrder.total,
            status: newOrder.status,
            address: newOrder.deliveryAddress,
            payment_method: newOrder.paymentMethod,
            is_new: true
        };

        let { data, error } = await supabase
            .from('orders')
            .insert([dbOrder])
            .select();

        // Fallback for local testing when rate-limited dummy profiles are used
        if (error && error.message.includes('foreign key constraint')) {
            console.warn("User ID not found in database (likely a rate-limited test account). Placing order without user linkage.");
            const fallbackDbOrder = { ...dbOrder, user_id: null };

            const retryResult = await supabase
                .from('orders')
                .insert([fallbackDbOrder])
                .select();

            data = retryResult.data;
            error = retryResult.error;
        }

        if (error) {
            console.error('Order Insert Error:', error);
            toast.error(`Failed to place order: ${error.message}`);
            return;
        }

        if (data && data.length > 0) {
            const confirmedOrder = mapDbOrderToOrder(data[0]);
            setOrders(prev => [confirmedOrder, ...prev]);
            toast.success('Order placed successfully!');
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus, is_new: false })
            .eq('id', orderId);

        if (error) {
            toast.error('Failed to update status');
            return;
        }
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId
                    ? { ...order, status: newStatus as Order['status'], isNew: false }
                    : order
            )
        );
    };

    const markNewOrdersAsRead = async () => {
        const { error } = await supabase
            .from('orders')
            .update({ is_new: false })
            .eq('is_new', true);

        if (error) console.error(error);

        setOrders(prev => prev.map(order => ({ ...order, isNew: false })));
        setNewOrdersCount(0);
    };

    const resetMenuToDefaults = () => {
        toast.info('Seed database manually using the provided SQL script to reset.');
    };

    return (
        <StoreContext.Provider value={{
            customerProfile, isCustomerLoggedIn, logoutCustomer,
            userRole, setUserRole,
            isAdminLoggedIn, setIsAdminLoggedIn,
            menuItems, addMenuItem, updateMenuItem, deleteMenuItem,
            orders, addOrder, updateOrderStatus,
            markNewOrdersAsRead, newOrdersCount,
            resetMenuToDefaults,
            location, setLocation, detectLocation
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
