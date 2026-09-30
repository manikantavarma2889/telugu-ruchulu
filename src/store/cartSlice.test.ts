import { describe, expect, it } from 'vitest';
import cartReducer, { addItem, clearCart, removeItem } from './cartSlice';
import { MenuItem } from '@/types';

const biryani: MenuItem = {
  id: 1,
  name: 'Chicken Biryani',
  description: 'Hyderabadi-style biryani',
  price: 250,
  category: 'biryani',
  image: '/biryani.jpg',
  isVeg: false,
  rating: 4.8,
};

describe('cartSlice', () => {
  it('adds a new menu item with quantity one', () => {
    const state = cartReducer(undefined, addItem(biryani));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ id: 1, name: 'Chicken Biryani', quantity: 1 });
  });

  it('increments quantity when the item already exists', () => {
    let state = cartReducer(undefined, addItem(biryani));
    state = cartReducer(state, addItem(biryani));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('decrements quantity and removes the item at zero', () => {
    let state = cartReducer(undefined, addItem(biryani));
    state = cartReducer(state, addItem(biryani));
    state = cartReducer(state, removeItem(biryani.id));

    expect(state.items[0].quantity).toBe(1);

    state = cartReducer(state, removeItem(biryani.id));

    expect(state.items).toEqual([]);
  });

  it('clears the complete cart', () => {
    let state = cartReducer(undefined, addItem(biryani));
    state = cartReducer(state, clearCart);

    expect(state.items).toEqual([]);
  });
});
