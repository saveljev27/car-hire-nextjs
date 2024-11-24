'use server';

import { userAllProfileBookings } from '@/app/actions';
import { BookingList, Container } from '@/shared/components';

export default async function MyOrders() {
  const orders = await userAllProfileBookings();
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
