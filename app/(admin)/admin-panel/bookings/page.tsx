import { Container } from '@/shared/components';
import { AdminBtn, BackBtn } from '@/shared/components/Admin/NavButtons';
import {
  BookingContent,
  BookingListSkeleton,
} from '@/shared/components/Booking';
import { PageHeader } from '@/shared/components/UI';
import { Suspense } from 'react';

export default async function AllBookings() {
  return (
    <Container flexCol>
      <PageHeader>All Bookings</PageHeader>
      <div className="flex gap-3 justify-center">
        <BackBtn />
        <AdminBtn />
      </div>
      <Suspense fallback={<BookingListSkeleton />}>
        <BookingContent type="ADMIN_BOOKINGS" />
      </Suspense>
    </Container>
  );
}
