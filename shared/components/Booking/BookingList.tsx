'use client';
import { DBOrderInfo } from '@/types';
import { Order } from '../Profile/Order';
import Link from 'next/link';
import { CustomButton, PageHeader } from '../UI';
import { BackBtn } from '../Admin/NavButtons';

interface AdminOrderListProps {
  orders: DBOrderInfo[];
  title?: string;
  isAdminPage?: boolean;
  showAllBtn?: boolean;
}

export const BookingList = ({
  orders,
  title,
  showAllBtn,
  isAdminPage,
}: AdminOrderListProps) => {
  const url = isAdminPage ? 'admin-panel/bookings' : 'profile/my-bookings';

  return (
    <>
      {!orders.length || orders.length === 0 ? (
        <p className="page__title mt-8">No bookings found...</p>
      ) : (
        <div className="mt-5 w-full min-w-[350px] max-w-[1000px] ">
          {!isAdminPage && <PageHeader>{title}</PageHeader>}
          {!showAllBtn && !isAdminPage && <BackBtn />}
          {orders.map((order: DBOrderInfo) => (
            <Link
              href={`/${url}/${order._id.toString()}`}
              className="w-full hover:opacity-80"
              key={order._id.toString()}
            >
              <Order {...order} />
            </Link>
          ))}
          {orders.length >= 5 && showAllBtn && (
            <Link href="/profile/my-bookings">
              <div className="mt-5 flex justify-center">
                <CustomButton
                  title="Show All Bookings"
                  btnType="button"
                  containerStyles="interface_btn"
                />
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
};
