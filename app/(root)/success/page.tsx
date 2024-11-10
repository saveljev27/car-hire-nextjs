'use server';

import { getServerSession } from 'next-auth';
import Link from 'next/link';

import { Container, CustomButton } from '@/shared/components';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Success({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const session = await getServerSession(options);

  return (
    <Container flexCol>
      <h1 className="profile__title">Thank You!</h1>
      {amount ? (
        <h1 className="text-center">
          The booking has been successfully completed and paid €{amount}! We
          will contact you shortly.
        </h1>
      ) : (
        <h1 className="text-center">
          The booking has been successfully completed! We will contact you
          shortly.
        </h1>
      )}
      <div className="flex align-center flex-col items-center mt-8">
        {session ? (
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
        ) : (
          <p className="mt-5 text-sm font-bold">
            If you want save your booking history you need to Sign Up!
          </p>
        )}
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
