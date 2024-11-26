'use server';

import { userAllProfileBookings } from '@/app/actions/profile';
import { BookingList, Container } from '@/shared/components';

export default async function MyOrders() {
  const orders = await userAllProfileBookings();
  return (
    <Container flexCol>
      <BookingList orders={orders} title={`My Bookings (${orders.length})`} />
    </Container>
  );
}
