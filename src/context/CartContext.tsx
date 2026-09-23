import { ReactNode } from 'react';
import { MenuItem } from '../types';
import { toast } from 'sonner';
import { useStore } from './StoreContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addItem, clearCart as clearReduxCart, removeItem } from '@/store/cartSlice';

interface CartContextType {
    cart: ReturnType<typeof useAppSelector>;
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart.items);
    const { isCustomerLoggedIn, setShowAuthModal } = useStore();

    const addToCart = (item: MenuItem) => {
        if (!isCustomerLoggedIn) {
            toast.info("Please login to order food.");
            setShowAuthModal(true);
            return;
        }

        dispatch(addItem(item));
        toast.success(`${item.name} added to cart!`);
    };

    const removeFromCart = (itemId: number) => {
        dispatch(removeItem(itemId));
    };

    const clearCart = () => dispatch(clearReduxCart());

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

import { createContext, useContext } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
