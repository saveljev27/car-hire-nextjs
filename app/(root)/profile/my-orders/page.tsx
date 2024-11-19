'use server';

import { userAllProfileOrders } from '@/app/actions';
import { Container } from '@/shared/components';
import { OrderList } from '@/shared/components/OrderList';

export default async function MyOrders() {
  const orders = await userAllProfileOrders();
  return (
    <Container flexCol>
      <OrderList
        orders={orders}
        title={`My Bookings (${orders.length})`}
        showAllBtn
      />
    </Container>
  );
}
