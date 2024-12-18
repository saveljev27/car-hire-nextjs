'use server';

import { findBooking, findBookingStatus } from '@/app/actions/booking';
import { Container } from '@/shared/components';
import {
  AdminBtn,
  BackBtn,
  OrderListBtn,
} from '@/shared/components/Admin/NavButtons';
import { BookingInfo } from '@/shared/components/Profile/BookingInfo';
import { PageHeader } from '@/shared/components/UI';

export default async function AdminSingleOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await findBooking(params?.id);
  const bookingStatus = await findBookingStatus(params?.id);

  return (
    <Container flexCol>
      {order ? (
        <>
          <PageHeader>Order: {order._id}</PageHeader>
          <div className="flex gap-3 justify-center mb-4">
            <BackBtn />
            <OrderListBtn />
            <AdminBtn />
          </div>
          <BookingInfo order={order} bookingStatus={bookingStatus} admin />
        </>
      ) : (
        <div>No Order Found</div>
      )}
    </Container>
  );
}
