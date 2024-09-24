'use client';

import Link from 'next/link';
import CustomButton from '../CustomButton';

export const OrderEmpty = () => {
  return (
    <div className="flex-1 pt-36 pb-36 padding-x">
      <div className="flex justify-center items-center flex-col w-full mx-auto">
        <h1 className="profile__title">
          You haven't chosen a car yet <span>😕</span>
        </h1>
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
};
