'use server';

import {
  BookingLogin,
  CarInfo,
  OrderInputs,
} from '@/shared/components/Booking';
import { Container } from '@/shared/components';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { findProfileInfo } from '@/app/actions/profile';

const Order = async () => {
  const profileData = await findProfileInfo();
  const session = await getServerSession(options);

  if (!session) {
    return <BookingLogin />;
  }

  return (
    <Container flexCol>
      <h1 className="page__title">Order Page</h1>
      <div className="flex max-xl:flex-col">
        <div>
          <CarInfo />
        </div>
        <div>
          <OrderInputs profileInfo={profileData} />
        </div>
      </div>
    </Container>
  );
};

export default Order;
