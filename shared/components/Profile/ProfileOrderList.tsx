'use client';
import { OrderSkeleton } from '../Profile/OrderSkeleton';
import { OrderList } from '../Profile';
import useProfileOrders from '@/shared/hooks/useProfileOrders';

interface ProfileOrderList {
  page: boolean;
  admin: boolean;
  title: string;
  limit: number;
}

export const ProfileOrderList = ({
  page,
  admin,
  title,
  limit,
}: ProfileOrderList) => {
  const { orders, loading } = useProfileOrders();

  if (loading) return <OrderSkeleton />;

  return (
    <OrderList
      orders={orders}
      title={`${title}`}
      page={page}
      admin={admin}
      limit={limit}
    />
  );
};
