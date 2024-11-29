'use server';

import { Container } from '@/shared/components';
import {
  BookingContent,
  BookingListSkeleton,
} from '@/shared/components/Booking';
import { Suspense } from 'react';

export default async function MyOrders() {
  return (
    <Container flexCol>
      <Suspense fallback={<BookingListSkeleton />}>
        <BookingContent type="PROFILE_ALL_BOOKINGS" />
      </Suspense>
    </Container>
  );
}
