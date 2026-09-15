import { describe, expect, it } from 'vitest';
import { getOrderStatusCounts, getRevenueByDate } from './orderAnalytics';
import { Order } from '@/types';

const orders: Order[] = [
  {
    id: '1', customerName: 'A', customerPhone: '1', items: ['Biryani'], total: 250,
    status: 'pending', orderTime: '2026-09-15T10:00:00.000Z', deliveryAddress: 'A', paymentMethod: 'UPI', isNew: true,
  },
  {
    id: '2', customerName: 'B', customerPhone: '2', items: ['Dosa'], total: 150,
    status: 'delivered', orderTime: '2026-09-15T12:00:00.000Z', deliveryAddress: 'B', paymentMethod: 'Cash', isNew: false,
  },
];

describe('order analytics', () => {
  it('groups orders by status', () => {
    expect(getOrderStatusCounts(orders)).toEqual([
      { status: 'pending', count: 1 },
      { status: 'delivered', count: 1 },
    ]);
  });

  it('calculates revenue totals by date', () => {
    const result = getRevenueByDate(orders);
    expect(result).toHaveLength(1);
    expect(result[0].revenue).toBe(400);
  });
});
