import { findOrder } from '@/app/actions';
import { Container } from '@/shared/components';
import { BookingEdit } from '@/shared/components/Admin/BookingEdit';
import { AdminBtn, OrderListBtn } from '@/shared/components/Admin/NavButtons';
import React from 'react';

export default async function EditBooking({
  params,
}: {
  params: { id: string };
}) {
  const booking = await findOrder(params?.id);

  return (
    <Container flexCol>
      <div className="flex gap-3 justify-center mb-4">
        <OrderListBtn />
        <AdminBtn />
      </div>
      <BookingEdit booking={booking} />
    </Container>
  );
}
