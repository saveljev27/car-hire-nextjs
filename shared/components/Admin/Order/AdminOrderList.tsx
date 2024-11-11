import { DBOrderInfo } from '@/types';
import { AdminOrder } from './AdminOrder';
import Link from 'next/link';

interface AdminOrderListProps {
  orders: DBOrderInfo[];
  title: string;
}

export const AdminOrderList = ({ orders, title }: AdminOrderListProps) => {
  return (
    <>
      {!orders.length || orders.length === 0 ? (
        <p className="page__title mt-8">No bookings found...</p>
      ) : (
        <>
          {orders.map((order: DBOrderInfo) => (
            <Link
              href={`/admin-panel/orders/${order._id.toString()}`}
              className="w-full hover:opacity-80"
              key={order._id.toString()}
            >
              <AdminOrder {...order} />
            </Link>
          ))}
        </>
      )}
    </>
  );
};
