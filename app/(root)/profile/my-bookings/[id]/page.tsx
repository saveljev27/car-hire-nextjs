import { findBooking } from '@/app/actions';
import { Container } from '@/shared/components';
import { BackBtn } from '@/shared/components/Admin/NavButtons';
import { BookingInfo } from '@/shared/components/Profile/BookingInfo';
import { PageHeader } from '@/shared/components/UI';

export default async function SingleOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await findBooking(params?.id);

  return (
    <Container flexCol>
      {order ? (
        <div>
          <PageHeader>Booking: {order._id}</PageHeader>
          <BackBtn />
          <div className="flex gap-3 justify-center mb-4"></div>
          <BookingInfo order={order} />
        </div>
      ) : (
        <div>No Order Found</div>
      )}
    </Container>
  );
}
