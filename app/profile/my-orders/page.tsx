'use server';

import { findProfileOrders } from '@/app/actions';
import { ProfileOrderList } from '@/shared/components/Profile';

export default async function MyOrders() {
  const orders = await findProfileOrders();

  return (
    <div className="pt-36 pb-36 padding-x">
      <div className="flex justify-center flex-col items-center w-full mx-auto">
        <ProfileOrderList orders={orders} title="All Bookings" />
      </div>
    </div>
  );
}
