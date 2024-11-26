'use server';

import { getServerSession } from 'next-auth';
import Link from 'next/link';

import { Container } from '@/shared/components';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { CustomButton } from '@/shared/components/UI';

import { redirect } from 'next/navigation';
import { findBookingStatus } from '@/app/actions/booking';

export default async function Success({ params }: { params: { id: string } }) {
  const session = await getServerSession(options);
  const bookings = await findBookingStatus(params.id);
  if (!session) {
    redirect('/');
  }

  return (
    <Container flexCol>
      <h1 className="profile__title">Thank You!</h1>
      {bookings.status === 'paid' && (
        <h1 className="text-center">
          The booking has been successfully completed and paid €
          {bookings.totalAmount}! We will contact you shortly.
        </h1>
      )}
      {bookings.status === 'unpaid' && (
        <h1 className="text-center">
          The bookings has been successfully reserved for €
          {bookings.totalAmount}! We will contact you shortly.
        </h1>
      )}

      <div className="flex align-center flex-col items-center mt-8">
        <>
          <p className="mt-5 text-sm font-bold">
            You can check out your booking in profile
          </p>
          <Link href="/profile">
            <CustomButton
              title="Check Order"
              btnType="button"
              containerStyles="text-white mt-5 rounded bg-primary-red min-w-[130px]"
            />
          </Link>
        </>
      </div>

      <Link href="/">
        <CustomButton
          title="Back to home screen"
          btnType="button"
          containerStyles="text-white mt-5 rounded bg-primary-red min-w-[130px]"
        />
      </Link>
    </Container>
  );
}
