import { getAllOrders } from '@/app/actions';
import { Container } from '@/shared/components';
import { AdminBtn } from '@/shared/components/Admin/NavButtons';
import { OrderList } from '@/shared/components/Profile/OrderList';
import { PageHeader } from '@/shared/components/UI';

export default async function Orders() {
  const orders = await getAllOrders();

  return (
    <Container flexCol>
      <PageHeader>Orders ({orders.length})</PageHeader>
      <AdminBtn />
      <OrderList orders={orders} admin />
    </Container>
  );
}
