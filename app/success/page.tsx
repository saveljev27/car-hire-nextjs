'use server';

import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { options } from '../api/auth/[...nextauth]/options';
import CustomButton from '@/components/CustomButton';

export default async function Success() {
  const session = await getServerSession(options);

  return (
    <div className="pt-36 pb-36 padding-x">
      <div className="flex justify-center flex-col items-center w-full mx-auto mt-8">
        <h1 className="profile__title">Thank You!</h1>
        <h1 className="text-center">
          The booking has been successfully completed! We will contact you
          shortly.
        </h1>
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
                  containerStyles="text-white mt-5 rounded-full bg-primary-red min-w-[130px]"
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
            containerStyles="text-white mt-5 rounded-full bg-primary-red min-w-[130px]"
          />
        </Link>
      </div>
    </div>
  );
}
