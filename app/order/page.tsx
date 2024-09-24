'use server';

import { CarInfo, OrderInputs } from '@/shared/components/Order';
import { headers } from 'next/headers';

const Order = async () => {
  const fetchProfileData = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/profile`, {
      method: 'GET',
      headers: headers(),
    });
    return await response.json();
  };
  const profileData = await fetchProfileData();

  return (
    <div className="pt-36 pb-36 padding-x max-width">
      <div className="flex justify-center flex-col w-full mx-auto mt-8">
        <h1 className="page__title">Order Page</h1>
        <div className="flex max-xl:flex-col">
          <div>
            <CarInfo />
          </div>
          <div>
            <OrderInputs profileInfo={profileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
