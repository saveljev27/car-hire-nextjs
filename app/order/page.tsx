'use server';

import { CarInfo, OrderInputs } from '@/shared/components/Order';
import { findProfileInfo } from '../actions';

const Order = async () => {
  const profileData = await findProfileInfo();

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
