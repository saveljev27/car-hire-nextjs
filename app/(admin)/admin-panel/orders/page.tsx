import { Container } from '@/shared/components';
import { AdminOrderList } from '@/shared/components/Admin/AdminOrderList';
import { AdminBtn } from '@/shared/components/Admin/NavButtons';
import { PageHeader } from '@/shared/components/UI';

export default function Orders() {
  return (
    <Container flexCol>
      <PageHeader>All Orders</PageHeader>
      <AdminBtn />
      <AdminOrderList />
    </Container>
  );
}
