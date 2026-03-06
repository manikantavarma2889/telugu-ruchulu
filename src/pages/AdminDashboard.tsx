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
    const {
        orders,
        setUserRole,
        setIsAdminLoggedIn,
        updateOrderStatus,
        markNewOrdersAsRead
    } = useStore();
    const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');

    const handleLogout = () => {
        setIsAdminLoggedIn(false);
        setUserRole('customer');
    };

    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r h-auto md:h-screen sticky top-0 md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary">Admin</h1>
                    <p className="text-sm text-muted-foreground">Manager Dashboard</p>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Button
                        variant={activeTab === 'orders' ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => { setActiveTab('orders'); markNewOrdersAsRead(); }}
                    >
                        <Package className="mr-2 h-4 w-4" /> Orders
                    </Button>
                    <Button
                        variant={activeTab === 'menu' ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('menu')}
                    >
                        <MenuIcon className="mr-2 h-4 w-4" /> Menu Items
                    </Button>
                </nav>
                <div className="p-4 border-t">
                    <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">₹{totalRevenue}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-orange-500">{pendingOrders}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{orders.length}</div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Items</TableHead>
                                                <TableHead>Total</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.map(order => (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium whitespace-nowrap">{order.id} {order.isNew && <Badge variant="destructive" className="ml-1 text-[10px]">New</Badge>}</TableCell>
                                                    <TableCell className="whitespace-nowrap">
                                                        <div className="flex flex-col">
                                                            <span>{order.customerName}</span>
                                                            <span className="text-xs text-muted-foreground">{order.customerPhone}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                                                            {order.items.join(', ')}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="whitespace-nowrap">Rs. {order.total}</TableCell>
                                                    <TableCell className="whitespace-nowrap">
                                                        <Badge variant={order.status === 'delivered' ? 'outline' : 'secondary'} className={
                                                            order.status === 'pending' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' :
                                                                order.status === 'preparing' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                                                    order.status === 'ready' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''
                                                        }>
                                                            {order.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                            defaultValue={order.status}
                                                            onValueChange={(val) => updateOrderStatus(order.id, val)}
                                                        >
                                                            <SelectTrigger className="w-[110px] h-8">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="pending">Pending</SelectItem>
                                                                <SelectItem value="preparing">Preparing</SelectItem>
                                                                <SelectItem value="ready">Ready</SelectItem>
                                                                <SelectItem value="delivered">Delivered</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'menu' && <MenuManagement />}
            </main>
        </div>
    );
}
