'use server';

import { userAllProfileOrders } from '@/app/actions';
import { BookingList, Container } from '@/shared/components';

export default async function MyOrders() {
  const orders = await userAllProfileOrders();
  return (
    <Container flexCol>
      <BookingList
        orders={orders}
        title={`My Bookings (${orders.length})`}
        showAllBtn
      />
    </Container>
  );
}
