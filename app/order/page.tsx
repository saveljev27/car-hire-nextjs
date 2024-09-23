'use server';

import CarInfo from '@/components/Order/CarInfo';
import OrderInputs from '@/components/Order/OrderInputs';
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
    <div className="flex-1 pt-36 pb-36 padding-x">
      <div className="flex justify-center flex-col w-full mx-auto mt-8">
        <h1 className="page__title">Order Page</h1>
        <div className="section">
          <CarInfo />
        </div>
        <div className="section">
          <OrderInputs profileInfo={profileData} />
        </div>
      </div>
    </div>
  );
};

export default Order;
