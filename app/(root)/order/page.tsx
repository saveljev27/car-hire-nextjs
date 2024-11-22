'use server';

import { CarInfo, OrderInputs } from '@/shared/components/Booking';
import { findProfileInfo } from '../../actions';
import { Container } from '@/shared/components';

const Order = async () => {
  const profileData = await findProfileInfo();

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
