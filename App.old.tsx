import { useState, useEffect } from 'react';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { AdminAuth } from './components/AdminAuth';
import { PaymentModal } from './components/PaymentModal';
import { MenuManagement, MenuItem } from './components/MenuManagement';
import { toast } from 'sonner@2.0.3';
import { 
  ShoppingCart, 
  DollarSign, 
  Clock, 
  Users, 
  Search, 
  Filter,
  ChefHat,
  Package,
  Home,
  BarChart3,
  Settings,
  Plus,
  Minus,
  Star,
  User,
  Shield,
  Bell,
  LogOut,
  CheckCircle,
  Menu
} from 'lucide-react';

// Initial menu items data with corrected and authentic Telugu food images
const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Hyderabadi Biryani',
    description: 'Aromatic basmati rice with tender mutton pieces, cooked with traditional spices and garnished with fried onions',
    price: 350,
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwaW5kaWFuJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzU1NjAyMzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    isVeg: false
  },
  {
    id: 2,
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice with mixed vegetables, aromatic spices, and garnished with fresh herbs',
    price: 280,
    category: 'biryani',
    image: 'https://images.unsplash.com/photo-1637426992376-b8af65fb90d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiaXJ5YW5pJTIwaW5kaWFufGVufDF8fHx8MTc1NTYwMjM1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
    isVeg: true
  },
  {
    id: 3,
    name: 'Chicken 65',
    description: 'Spicy and crispy deep-fried chicken pieces tossed with curry leaves, green chilies, and special spices',
    price: 320,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1708184528306-f75a0a5118ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwNjUlMjBpbmRpYW4lMjBmb29kfGVufDF8fHx8MTc1NTYwMjM1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    isVeg: false
  },
  {
    id: 4,
    name: 'Andhra Meals',
    description: 'Traditional Andhra thali with steamed rice, sambar, rasam, variety of curries, pickles, and papad',
    price: 250,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1672477179695-7276b0602fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMHRoYWxpJTIwbWVhbHxlbnwxfHx8fDE3NTU1MTUzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    isVeg: true
  },
  {
    id: 5,
    name: 'Mutton Curry',
    description: 'Tender mutton pieces slow-cooked in traditional Telugu style gravy with onions, tomatoes, and aromatic spices',
    price: 420,
    category: 'curries',
    image: 'https://images.unsplash.com/photo-1640542509430-f529fdfce835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXR0b24lMjBjdXJyeSUyMGdvYXQlMjBjdXJyeXxlbnwxfHx8fDE3NTU2MDIzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    isVeg: false
  },
  {
    id: 6,
    name: 'Fish Curry',
    description: 'Fresh fish cooked in tangy tamarind and coconut gravy with curry leaves and traditional Telugu spices',
    price: 380,
    category: 'curries',
    image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwY3VycnklMjBjb2NvbnV0JTIwaW5kaWFufGVufDF8fHx8MTc1NTYwMjM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.4,
    isVeg: false
  },
  {
    id: 7,
    name: 'Masala Dosa',
    description: 'Crispy rice and lentil crepe filled with spiced potato curry, served with coconut chutney and sambar',
    price: 180,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1723388800779-5699cc142f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBkb3NhJTIwY3Jpc3B5JTIwc291dGglMjBpbmRpYW58ZW58MXx8fHwxNzU1NjAyMzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.3,
    isVeg: true
  },
  {
    id: 8,
    name: 'Pesarattu',
    description: 'Nutritious green gram (moong dal) dosa served with spicy upma and ginger chutney - an Andhra specialty',
    price: 160,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1700310633830-74095f9f70c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXNhcmF0dHUlMjBhbmRocmElMjBkb3NhfGVufDF8fHx8MTc1NTYwMjM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.2,
    isVeg: true
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: string[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  orderTime: string;
  deliveryAddress: string;
  paymentMethod?: string;
  isNew?: boolean;
}

// Initial mock orders
const initialMockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Ramesh Kumar',
    customerPhone: '+91 98765 43210',
    items: ['Hyderabadi Biryani', 'Raita', 'Shorba'],
    total: 450,
    status: 'preparing',
    orderTime: '2024-07-29T10:30:00',
    deliveryAddress: 'Jubilee Hills, Hyderabad',
    paymentMethod: 'Card'
  },
  {
    id: 'ORD-002',
    customerName: 'Priya Sharma',
    customerPhone: '+91 87654 32109',
    items: ['Andhra Meals', 'Pickle', 'Papad'],
    total: 320,
    status: 'ready',
    orderTime: '2024-07-29T11:15:00',
    deliveryAddress: 'Banjara Hills, Hyderabad',
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD-003',
    customerName: 'Venkat Reddy',
    customerPhone: '+91 76543 21098',
    items: ['Mutton Curry', 'Rice', 'Dal'],
    total: 580,
    status: 'delivered',
    orderTime: '2024-07-29T09:45:00',
    deliveryAddress: 'Madhapur, Hyderabad',
    paymentMethod: 'COD'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ready': return 'bg-green-100 text-green-800 border-green-200';
    case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatTime = (timeString: string) => {
  return new Date(timeString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function App() {
  const [userRole, setUserRole] = useState<'customer' | 'admin' | 'admin-auth'>('customer');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [orders, setOrders] = useState<Order[]>(initialMockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  // Customer form data
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'biryani', name: 'Biryani' },
    { id: 'curries', name: 'Curries' },
    { id: 'meals', name: 'Meals' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];

  // Menu management functions
  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    toast.success(`${updatedItem.name} updated successfully! Changes are now visible to customers.`);
  };

  const handleAddMenuItem = (newItemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...newItemData,
      id: Math.max(...menuItems.map(item => item.id)) + 1
    };
    setMenuItems(prev => [...prev, newItem]);
    toast.success(`${newItem.name} added to menu successfully!`);
  };

  const handleDeleteMenuItem = (id: number) => {
    const itemToDelete = menuItems.find(item => item.id === id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
    // Remove from cart if it exists
    setCart(prev => prev.filter(item => item.id !== id));
    if (itemToDelete) {
      toast.success(`${itemToDelete.name} removed from menu successfully!`);
    }
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image
        }];
      }
    });
    toast.success(`${item.name} added to cart!`);
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId);
      }
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const proceedToPayment = () => {
    if (cart.length === 0) return;
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error('Please fill in all customer details');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    // Create new order
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      items: cart.map(item => `${item.name} (${item.quantity})`),
      total: getCartTotal() + 30 + Math.round(getCartTotal() * 0.05), // Including delivery and tax
      status: 'pending',
      orderTime: new Date().toISOString(),
      deliveryAddress: customerInfo.address,
      paymentMethod: 'Online',
      isNew: true
    };

    // Add to orders list
    setOrders(prev => [newOrder, ...prev]);
    setNewOrdersCount(prev => prev + 1);

    // Reset cart and form
    setCart([]);
    setCustomerInfo({ name: '', phone: '', address: '', notes: '' });
    setIsCartOpen(false);
    setIsPaymentModalOpen(false);

    // Show success message
    toast.success('Order placed successfully! You will receive a confirmation shortly.');
    
    // Admin notification (if admin is logged in)
    if (userRole === 'admin' && isAdminLoggedIn) {
      toast.info(`New order received: ${newOrder.id}`);
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as Order['status'], isNew: false }
          : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setUserRole('admin');
    toast.success('Admin logged in successfully');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setUserRole('customer');
    toast.info('Admin logged out');
  };

  const markNewOrdersAsRead = () => {
    setOrders(prev => prev.map(order => ({ ...order, isNew: false })));
    setNewOrdersCount(0);
  };

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const readyOrders = orders.filter(order => order.status === 'ready').length;

  // Handle admin access
  if (userRole === 'admin-auth' || (!isAdminLoggedIn && userRole === 'admin')) {
    return <AdminAuth onLogin={handleAdminLogin} />;
  }

  if (userRole === 'customer') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <div>
                  <h1 className="text-xl font-semibold">Telugu Ruchulu</h1>
                  <p className="text-sm text-muted-foreground">Authentic Telugu Cuisine</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUserRole('admin-auth')}
                  className="hidden sm:flex"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Login
                </Button>
                
                <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="relative">
                      <ShoppingCart className="h-4 w-4" />
                      {getCartItemCount() > 0 && (
                        <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs">
                          {getCartItemCount()}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle>Your Cart ({getCartItemCount()} items)</SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex flex-col h-full">
                      <div className="flex-1 overflow-auto py-4">
                        {cart.length === 0 ? (
                          <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                        ) : (
                          <div className="space-y-4">
                            {cart.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                                <ImageWithFallback
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">₹{item.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addToCart(menuItems.find(menuItem => menuItem.id === item.id)!)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {cart.length > 0 && (
                        <div className="border-t pt-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Subtotal: ₹{getCartTotal()}</span>
                          </div>
                          
                          <div className="space-y-3">
                            <Input
                              placeholder="Your name"
                              value={customerInfo.name}
                              onChange={(e) => setCustomerInfo(prev => ({...prev, name: e.target.value}))}
                            />
                            <Input
                              placeholder="Phone number"
                              value={customerInfo.phone}
                              onChange={(e) => setCustomerInfo(prev => ({...prev, phone: e.target.value}))}
                            />
                            <Textarea
                              placeholder="Delivery address"
                              value={customerInfo.address}
                              onChange={(e) => setCustomerInfo(prev => ({...prev, address: e.target.value}))}
                            />
                            <Textarea
                              placeholder="Special instructions (optional)"
                              value={customerInfo.notes}
                              onChange={(e) => setCustomerInfo(prev => ({...prev, notes: e.target.value}))}
                            />
                          </div>
                          
                          <Button
                            className="w-full"
                            onClick={proceedToPayment}
                            disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.address}
                          >
                            Proceed to Payment - ₹{getCartTotal()}
                          </Button>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        {/* Fixed Place Order Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <Button 
              size="lg" 
              className="shadow-lg"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Place Order ({getCartItemCount()} items) - ₹{getCartTotal()}
            </Button>
          </div>
        )}

        {/* Menu Content */}
        <main className="container mx-auto px-4 py-6 pb-24">
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="text-center py-4">
              <h2 className="text-2xl font-semibold mb-2">Welcome to Telugu Ruchulu</h2>
              <p className="text-muted-foreground">Experience the authentic flavors of Telugu cuisine, made with traditional recipes and fresh ingredients</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMenuItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-semibold">₹{item.price}</span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          cart={cart}
          customerInfo={customerInfo}
          total={getCartTotal()}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  // Admin Dashboard
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarContent className="p-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="h-8 w-8 text-orange-600" />
                <h1 className="text-xl font-semibold">Telugu Ruchulu</h1>
              </div>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
            
            <nav className="space-y-2">
              <Button
                variant={activeSection === 'dashboard' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveSection('dashboard')}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeSection === 'orders' ? 'secondary' : 'ghost'}
                className="w-full justify-start relative"
                onClick={() => {
                  setActiveSection('orders');
                  markNewOrdersAsRead();
                }}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
                {newOrdersCount > 0 && (
                  <Badge className="ml-auto px-2 py-1 text-xs bg-red-500">
                    {newOrdersCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant={activeSection === 'menu' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveSection('menu')}
              >
                <Menu className="mr-2 h-4 w-4" />
                Menu Management
              </Button>
              <Button
                variant={activeSection === 'analytics' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveSection('analytics')}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              <Button
                variant={activeSection === 'settings' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveSection('settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              
              <Separator className="my-4" />
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setUserRole('customer')}
              >
                <User className="mr-2 h-4 w-4" />
                Customer View
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleAdminLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {activeSection === 'menu' ? (
              <MenuManagement
                menuItems={menuItems}
                onUpdateMenuItem={handleUpdateMenuItem}
                onAddMenuItem={handleAddMenuItem}
                onDeleteMenuItem={handleDeleteMenuItem}
              />
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold">Order Dashboard</h1>
                    <p className="text-muted-foreground">Manage your Telugu Ruchulu orders efficiently</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {newOrdersCount > 0 && (
                      <Button variant="outline" size="sm" onClick={markNewOrdersAsRead}>
                        <Bell className="mr-2 h-4 w-4" />
                        {newOrdersCount} New Orders
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserRole('customer')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Customer View
                    </Button>
                    <SidebarTrigger className="md:hidden" />
                  </div>
                </div>

                {/* Overview Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalOrders}</div>
                      <p className="text-xs text-muted-foreground">Today's orders</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{totalRevenue}</div>
                      <p className="text-xs text-muted-foreground">Today's earnings</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
                      <p className="text-xs text-muted-foreground">Awaiting preparation</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ready Orders</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{readyOrders}</div>
                      <p className="text-xs text-muted-foreground">Ready for pickup</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders by customer name or order ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Orders Table */}
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
                            <TableHead>Time</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.map((order) => (
                            <TableRow key={order.id} className={order.isNew ? "bg-blue-50" : ""}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  {order.id}
                                  {order.isNew && <Badge variant="secondary" className="text-xs">NEW</Badge>}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                      {order.customerName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{order.customerName}</div>
                                    <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                                  </div>
                                </div>
                              </TableCell>
                               <TableCell>
                                <div className="max-w-[200px]">
                                  <div className="font-medium">{order.items[0]}</div>
                                  {order.items.length > 1 && (
                                    <div className="text-sm text-muted-foreground">
                                      +{order.items.length - 1} more items
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">₹{order.total}</TableCell>
                              <TableCell>{formatTime(order.orderTime)}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{order.paymentMethod || 'N/A'}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Select
                                  defaultValue={order.status}
                                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                                >
                                  <SelectTrigger className="w-[120px]">
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
