'use client';
import useAllOrders from '@/shared/hooks/useAllOrders';
import { OrderList } from '../Profile';
import { AdminOrderSkeleton } from './AdminOrderSkeleton';

export const AdminOrderList = () => {
  const { orders, loading } = useAllOrders();

  if (loading) return <AdminOrderSkeleton />;

  return <OrderList orders={orders} admin />;
};
