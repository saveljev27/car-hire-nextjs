import { getAllBookings } from '@/app/actions';
import { Container } from '@/shared/components';
import { AdminBtn } from '@/shared/components/Admin/NavButtons';
import { OrderList } from '@/shared/components/OrderList';
import { PageHeader } from '@/shared/components/UI';

export default async function AllBookings() {
  const orders = await getAllBookings();
  return (
    <Container flexCol>
      <PageHeader>All Orders ({orders.length})</PageHeader>
      <AdminBtn />
      <OrderList orders={orders} isAdminPage />
    </Container>
  );
}
