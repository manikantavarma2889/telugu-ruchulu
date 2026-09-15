import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Menu as MenuIcon, LogOut } from "lucide-react";
import { MenuManagement } from "@/components/admin/MenuManagement";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AdminDashboard() {
    const { orders, setUserRole, setIsAdminLoggedIn, updateOrderStatus, markNewOrdersAsRead } = useStore();
    const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
    const handleLogout = () => { setIsAdminLoggedIn(false); setUserRole('customer'); };
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

    return <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-white border-r h-auto md:h-screen sticky top-0 md:flex flex-col" aria-label="Admin navigation">
            <div className="p-6"><h1 className="text-2xl font-bold text-primary">Admin</h1><p className="text-sm text-muted-foreground">Manager Dashboard</p></div>
            <nav className="flex-1 px-4 space-y-2" aria-label="Dashboard sections">
                <Button type="button" aria-pressed={activeTab === 'orders'} variant={activeTab === 'orders' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => { setActiveTab('orders'); markNewOrdersAsRead(); }}><Package className="mr-2 h-4 w-4" aria-hidden="true" /> Orders</Button>
                <Button type="button" aria-pressed={activeTab === 'menu'} variant={activeTab === 'menu' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => setActiveTab('menu')}><MenuIcon className="mr-2 h-4 w-4" aria-hidden="true" /> Menu Items</Button>
            </nav>
            <div className="p-4 border-t"><Button type="button" variant="ghost" aria-label="Log out of admin dashboard" className="w-full text-destructive hover:bg-destructive/10" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" aria-hidden="true" /> Logout</Button></div>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto" aria-label="Admin dashboard content" tabIndex={-1}>
            {activeTab === 'orders' && <div className="space-y-6" aria-labelledby="orders-heading"><h2 id="orders-heading" className="sr-only">Order management dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold" aria-label={`Total revenue ${totalRevenue} rupees`}>₹{totalRevenue}</div></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-orange-500" aria-label={`${pendingOrders} pending orders`}>{pendingOrders}</div></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold" aria-label={`${orders.length} total orders`}>{orders.length}</div></CardContent></Card>
                </div>
                <Card><CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><Table><caption className="sr-only">Recent customer orders and their current status</caption><TableHeader><TableRow><TableHead scope="col">Order ID</TableHead><TableHead scope="col">Customer</TableHead><TableHead scope="col">Items</TableHead><TableHead scope="col">Total</TableHead><TableHead scope="col">Status</TableHead><TableHead scope="col">Action</TableHead></TableRow></TableHeader><TableBody>{orders.map(order => <TableRow key={order.id}><TableCell className="font-medium whitespace-nowrap">{order.id} {order.isNew && <Badge variant="destructive" aria-label="New order" className="ml-1 text-[10px]">New</Badge>}</TableCell><TableCell className="whitespace-nowrap"><div className="flex flex-col"><span>{order.customerName}</span><span className="text-xs text-muted-foreground">{order.customerPhone}</span></div></TableCell><TableCell><div className="max-w-[200px] truncate text-sm text-muted-foreground" title={order.items.join(', ')}>{order.items.join(', ')}</div></TableCell><TableCell className="whitespace-nowrap">Rs. {order.total}</TableCell><TableCell className="whitespace-nowrap"><Badge variant={order.status === 'delivered' ? 'outline' : 'secondary'}>{order.status}</Badge></TableCell><TableCell><Select defaultValue={order.status} onValueChange={(val) => updateOrderStatus(order.id, val)}><SelectTrigger aria-label={`Change status for order ${order.id}`} className="w-[110px] h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="preparing">Preparing</SelectItem><SelectItem value="ready">Ready</SelectItem><SelectItem value="delivered">Delivered</SelectItem></SelectContent></Select></TableCell></TableRow>)}</TableBody></Table></div></CardContent></Card>
            </div>}
            {activeTab === 'menu' && <section aria-label="Menu management"><MenuManagement /></section>}
        </main>
    </div>;
}
