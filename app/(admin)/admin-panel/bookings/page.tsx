import { getAllBookings } from '@/app/actions';
import { BookingList, Container } from '@/shared/components';
import { AdminBtn } from '@/shared/components/Admin/NavButtons';
import { PageHeader } from '@/shared/components/UI';

export default async function AllBookings() {
  const orders = await getAllBookings();
  return (
    <Container flexCol>
      <PageHeader>All Bookings ({orders.length})</PageHeader>
      <AdminBtn />
      <BookingList orders={orders} isAdminPage />
    </Container>
  );
}
