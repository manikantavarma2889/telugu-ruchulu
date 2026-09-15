import { Order } from '@/types';

export type OrderStatusCount = {
  status: string;
  count: number;
};

export type RevenuePoint = {
  date: string;
  revenue: number;
};

export function getOrderStatusCounts(orders: Order[]): OrderStatusCount[] {
  const counts = new Map<string, number>();

  orders.forEach(order => {
    counts.set(order.status, (counts.get(order.status) ?? 0) + 1);
  });

  return Array.from(counts.entries()).map(([status, count]) => ({ status, count }));
}

export function getRevenueByDate(orders: Order[]): RevenuePoint[] {
  const revenue = new Map<string, number>();

  orders.forEach(order => {
    const date = new Date(order.orderTime).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    });
    revenue.set(date, (revenue.get(date) ?? 0) + order.total);
  });

  return Array.from(revenue.entries()).map(([date, total]) => ({
    date,
    revenue: Number(total.toFixed(2)),
  }));
}
