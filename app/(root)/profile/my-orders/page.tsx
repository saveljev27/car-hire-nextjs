'use server';

import { findProfileOrders } from '@/app/actions';
import { Container } from '@/shared/components';
import { OrderList } from '@/shared/components/Profile';

export default async function MyOrders() {
  const orders = await findProfileOrders();

  return (
    <Container flexCol>
      <OrderList orders={orders} title={`All Bookings (${orders.length})`} />
    </Container>
  );
}
