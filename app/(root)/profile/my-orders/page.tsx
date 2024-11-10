'use server';

import { findProfileOrders } from '@/app/actions';
import { Container } from '@/shared/components';
import { ProfileOrderList } from '@/shared/components/Profile';

export default async function MyOrders() {
  const orders = await findProfileOrders();

  return (
    <Container flexCol>
      <ProfileOrderList orders={orders} title="All Bookings" />
    </Container>
  );
}
