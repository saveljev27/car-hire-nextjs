'use server';

import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function Success() {
  const session = await getServerSession(options);

  if (!session) {
    return redirect('/');
  }

  return (
    <div className="flex-1 pt-36 pb-36 padding-x">
      <div className="flex justify-center flex-col items-center w-full mx-auto">
        <h1 className="profile__title">Thank You!</h1>
        <h1>
          The booking has been successfully completed! We will contact you
          shortly.
        </h1>
        <p className="mt-5">You can check out your booking in profile</p>
        <div className="flex align-center flex-col items-center mt-8">
          <Link href="/profile">
            <CustomButton
              title="Check Order"
              btnType="button"
              containerStyles="text-white mt-5 rounded-full bg-primary-red min-w-[130px]"
            />
          </Link>
          <Link href="/">
            <CustomButton
              title="Back to home screen"
              btnType="button"
              containerStyles="text-white mt-5 rounded-full bg-primary-red min-w-[130px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
