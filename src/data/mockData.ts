import { MenuItem, Order } from '../types';

export const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'biryani', name: 'Biryani' },
    { id: 'curries', name: 'Curries' },
    { id: 'meals', name: 'Meals' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
];

export const initialMenuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Hyderabadi Biryani',
        description: 'Aromatic basmati rice with tender mutton pieces, cooked with traditional spices and garnished with fried onions',
        price: 350,
        category: 'biryani',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1080&auto=format&fit=crop', // Specific Hyderabadi Dum Biryani look
        rating: 4.8,
        isVeg: false
    },
    {
        id: 2,
        name: 'Vegetable Biryani',
        description: 'Fragrant basmati rice with mixed vegetables, aromatic spices, and garnished with fresh herbs',
        price: 280,
        category: 'biryani',
        image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1080&auto=format&fit=crop', // Veg Biryani from side angle
        rating: 4.5,
        isVeg: true
    },
    {
        id: 3,
        name: 'Chicken 65',
        description: 'Spicy and crispy deep-fried chicken pieces tossed with curry leaves, green chilies, and special spices',
        price: 320,
        category: 'appetizers',
        image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=1080&auto=format&fit=crop', // Red Spicy Chicken Appetizer
        rating: 4.7,
        isVeg: false
    },
    {
        id: 4,
        name: 'Andhra Meals',
        description: 'Traditional Andhra thali with steamed rice, sambar, rasam, variety of curries, pickles, and papad',
        price: 250,
        category: 'meals',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1080&auto=format&fit=crop', // Banana Leaf Meal
        rating: 4.6,
        isVeg: true
    },
    {
        id: 5,
        name: 'Mutton Curry',
        description: 'Tender mutton pieces slow-cooked in traditional Telugu style gravy with onions, tomatoes, and aromatic spices',
        price: 420,
        category: 'curries',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1080&auto=format&fit=crop', // Rich Gravy Curry
        rating: 4.9,
        isVeg: false
    },
    {
        id: 6,
        name: 'Fish Curry',
        description: 'Fresh fish cooked in tangy tamarind and coconut gravy with curry leaves and traditional Telugu spices',
        price: 380,
        category: 'curries',
        image: 'https://images.unsplash.com/photo-1690403300262-34927cbcdba8?q=80&w=1080&auto=format&fit=crop', // Fish Curry Bowl
        rating: 4.4,
        isVeg: false
    },
    {
        id: 7,
        name: 'Masala Dosa',
        description: 'Crispy rice and lentil crepe filled with spiced potato curry, served with coconut chutney and sambar',
        price: 180,
        category: 'breakfast',
        image: 'https://images.unsplash.com/photo-1668236543090-d2f896b8c43c?q=80&w=1080&auto=format&fit=crop', // Dosa with Chutneys
        rating: 4.3,
        isVeg: true
    },
    {
        id: 8,
        name: 'Pesarattu',
        description: 'Nutritious green gram (moong dal) dosa served with spicy upma and ginger chutney - an Andhra specialty',
        price: 160,
        category: 'breakfast',
        image: 'https://images.unsplash.com/photo-1653139824653-a1f948f2203d?q=80&w=1080&auto=format&fit=crop', // Green Dosa Texture
        rating: 4.2,
        isVeg: true
    }
];

export const initialMockOrders: Order[] = [
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
