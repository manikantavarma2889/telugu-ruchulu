export type UserRole = 'customer' | 'admin';

export interface MenuItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    category: string;
    image?: string;
    isVeg: boolean;
    rating: number;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
}

export interface CustomerProfile extends CustomerInfo {
    id: string; // Supabase auth.users ID
    email: string;
}

export interface Order {
    id: string;
    userId?: string; // Optional for backwards compatibility, but used for tracking
    customerName: string;
    customerPhone: string;
    items: string[];
    total: number;
    status: 'pending' | 'preparing' | 'ready' | 'delivered';
    orderTime: string;
    deliveryAddress: string;
    paymentMethod: string;
    isNew?: boolean;
}
