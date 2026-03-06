import { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { supabase } from "@/lib/supabase";
import { Order } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle2, UtensilsCrossed } from "lucide-react";

export function CustomerOrders() {
    const { customerProfile } = useStore();
    const [myOrders, setMyOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!customerProfile) return;

        const fetchMyOrders = async () => {
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', customerProfile.id)
                .order('created_at', { ascending: false });

            if (data) {
                const mappedOrders = data.map(dbOrder => ({
                    id: dbOrder.id,
                    userId: dbOrder.user_id,
                    customerName: dbOrder.customer_name,
                    customerPhone: dbOrder.customer_phone,
                    items: dbOrder.items,
                    total: Number(dbOrder.total),
                    status: dbOrder.status,
                    orderTime: dbOrder.created_at,
                    deliveryAddress: dbOrder.address,
                    paymentMethod: dbOrder.payment_method,
                    isNew: dbOrder.is_new
                }));
                setMyOrders(mappedOrders);
            }
            setLoading(false);
        };

        fetchMyOrders();

        // Listen for real-time updates on ALL orders and update if it matches a local order
        const myOrdersSubscription = supabase
            .channel('my-orders-realtime')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'orders'
            }, payload => {
                setMyOrders(prev => {
                    // Only update if the order exists in our local state
                    if (prev.some(order => order.id === payload.new.id)) {
                        return prev.map(order =>
                            order.id === payload.new.id ? { ...order, status: payload.new.status } : order
                        );
                    }
                    return prev;
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(myOrdersSubscription);
        };
    }, [customerProfile]);

    if (!customerProfile) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-lg border border-dashed mt-8">
                <UtensilsCrossed className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">Login to View Orders</h3>
                <p className="text-muted-foreground max-w-sm mb-6">Create an account or login to track your active orders and view your delicious history.</p>
            </div>
        );
    }

    if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading your orders...</div>;

    if (myOrders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-lg border border-dashed mt-8">
                <Package className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground max-w-sm">Looks like you haven't placed any orders with us yet. Time to explore the menu!</p>
            </div>
        );
    }

    const getStatusDetails = (status: string) => {
        switch (status) {
            case 'pending': return { icon: <Clock className="h-4 w-4" />, color: "bg-orange-100 text-orange-800 border-orange-200", text: "Order Received" };
            case 'preparing': return { icon: <UtensilsCrossed className="h-4 w-4" />, color: "bg-blue-100 text-blue-800 border-blue-200", text: "In the Kitchen" };
            case 'ready': return { icon: <Package className="h-4 w-4" />, color: "bg-purple-100 text-purple-800 border-purple-200", text: "Out for Delivery" };
            case 'delivered': return { icon: <CheckCircle2 className="h-4 w-4" />, color: "bg-green-100 text-green-800 border-green-200", text: "Delivered" };
            default: return { icon: <Clock className="h-4 w-4" />, color: "bg-gray-100 text-gray-800", text: status };
        }
    };

    const activeOrders = myOrders.filter(o => o.status !== 'delivered');
    const pastOrders = myOrders.filter(o => o.status === 'delivered');

    return (
        <div className="space-y-8 mt-8 pb-12">
            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">My Dashboard</h2>

                {activeOrders.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                            </span>
                            Active Orders
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeOrders.map(order => {
                                const status = getStatusDetails(order.status);
                                return (
                                    <Card key={order.id} className="border-orange-200 shadow-sm overflow-hidden relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                                        <CardContent className="p-5">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-xs text-muted-foreground font-mono mb-1">{order.id}</p>
                                                    <Badge variant="outline" className={`${status.color} flex items-center gap-1.5 pl-1.5 pr-2.5 py-0.5 border`}>
                                                        {status.icon} {status.text}
                                                    </Badge>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">Rs. {order.total}</p>
                                                    <p className="text-xs text-muted-foreground">{new Date(order.orderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-1 mt-4">
                                                {order.items.map((item, i) => (
                                                    <p key={i} className="text-sm border-b pb-1 last:border-0">{item}</p>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}

                {pastOrders.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Order History</h3>
                        <div className="space-y-3">
                            {pastOrders.map(order => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-white border rounded-xl hover:shadow-sm transition-all duration-200">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-sm line-clamp-1">{order.items.join(', ')}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(order.orderTime).toLocaleDateString()} • {order.paymentMethod}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-right shrink-0">
                                        <div>
                                            <p className="font-bold text-sm">Rs. {order.total}</p>
                                            <Badge variant="secondary" className="text-[10px] mt-1 bg-green-50 text-green-700 hover:bg-green-50">Delivered</Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
