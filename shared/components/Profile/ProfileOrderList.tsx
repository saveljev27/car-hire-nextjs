import { DBOrderInfo } from '@/types';
import { ProfileOrder } from './ProfileOrder';

interface ProfileOrderListProps {
  orders: DBOrderInfo[];
  title: string;
}

export const ProfileOrderList = ({ orders, title }: ProfileOrderListProps) => {
  return (
    <>
      {!orders.length || orders.length === 0 ? (
        <p className="page__title mt-8">No bookings found...</p>
      ) : (
        <>
          <h1 className="page__title mt-8">{title}</h1>
          {orders.map((order: DBOrderInfo) => (
            <ProfileOrder key={order._id.toString()} {...order} />
          ))}
        </>
      )}
    </>
  );
};
