'use server';

import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { ClientInputs } from '@/shared/components/Profile';

import { Container } from '@/shared/components';
import { findProfileInfo } from '@/app/actions/profile';
import {
  BookingContent,
  BookingListSkeleton,
} from '@/shared/components/Booking';
import { Suspense } from 'react';

export default async function Profile() {
  const session = await getServerSession(options);
  const userImage = session?.user?.image;

  if (!session) redirect('/');

  const profileData = await findProfileInfo();

  return (
    <Container flexCol>
      <ClientInputs profileInfo={profileData} image={userImage} />
      <div className="divider" />
      <Suspense fallback={<BookingListSkeleton />}>
        <BookingContent type="PROFILE_BOOKINGS" />
      </Suspense>
    </Container>
  );
}
