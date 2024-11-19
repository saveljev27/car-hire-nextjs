'use client';
import { DBOrderInfo } from '@/types';
import { Order } from './Profile/Order';
import Link from 'next/link';
import { CustomButton, PageHeader } from './UI';

interface AdminOrderListProps {
  orders: DBOrderInfo[];
  title?: string;
  isAdminPage?: boolean;
  showAllBtn?: boolean;
}

export const OrderList = ({
  orders,
  title,
  showAllBtn,
  isAdminPage,
}: AdminOrderListProps) => {
  const url = isAdminPage ? 'admin-panel/orders' : 'profile/my-orders';

  return (
    <>
      {!orders.length || orders.length === 0 ? (
        <p className="page__title mt-8">No bookings found...</p>
      ) : (
        <div className="mt-5 w-full min-w-[600px] max-w-[1000px] ">
          {!isAdminPage && <PageHeader>{title}</PageHeader>}
          {orders.map((order: DBOrderInfo) => (
            <Link
              href={`/${url}/${order._id.toString()}`}
              className="w-full hover:opacity-80"
              key={order._id.toString()}
            >
              <Order {...order} />
            </Link>
          ))}
          {orders.length >= 5 && !showAllBtn && (
            <Link href="/profile/my-orders">
              <div className="mt-5">
                <CustomButton
                  title="Show All Bookings"
                  btnType="button"
                  containerStyles="showmore__btn"
                />
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};
