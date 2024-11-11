import { getAllOrders } from '@/app/actions';
import { Container } from '@/shared/components';
import { AdminOrderList } from '@/shared/components/Admin/Order/AdminOrderList';
import { CustomButton, PageHeader } from '@/shared/components/UI';
import Link from 'next/link';

export default async function Orders() {
  const orders = await getAllOrders();

  return (
    <Container flexCol>
      <PageHeader>Orders ({orders.length})</PageHeader>
      <Link href="/admin-panel/">
        <CustomButton
          title="Back to admin panel"
          containerStyles="showmore__btn"
        />
      </Link>
      <AdminOrderList orders={orders} title="All Bookings" />
    </Container>
  );
}
