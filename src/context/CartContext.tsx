import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem } from '../types';
import { toast } from 'sonner';
import { useStore } from './StoreContext';

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { isCustomerLoggedIn, setShowAuthModal } = useStore();

    const addToCart = (item: MenuItem) => {
        if (!isCustomerLoggedIn) {
            toast.info("Please login to order food.");
            setShowAuthModal(true);
            return;
        }

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
                    ...item,
                    quantity: 1
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

    const clearCart = () => setCart([]);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartItemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
