import { getAllBookings } from '@/app/actions';
import { BookingList, Container } from '@/shared/components';
import { AdminBtn, BackBtn } from '@/shared/components/Admin/NavButtons';
import { PageHeader } from '@/shared/components/UI';

export default async function AllBookings() {
  const orders = await getAllBookings();
  return (
    <Container flexCol>
      <PageHeader>All Bookings ({orders.length})</PageHeader>
      <div className="flex gap-3 justify-center">
        <BackBtn />
        <AdminBtn />
      </div>
      <BookingList orders={orders} isAdminPage />
    </Container>
  );
}
