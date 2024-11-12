'use server';

import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { ClientInputs, OrderList } from '@/shared/components/Profile';
import { findProfileInfo, findProfileOrders } from '../../actions';
import { Container } from '@/shared/components';

export default async function Profile() {
  const session = await getServerSession(options);
  const userImage = session?.user?.image;

  if (!session) redirect('/');

  const profileData = await findProfileInfo();
  const orders = await findProfileOrders(false);

  return (
    <Container flexCol>
      <ClientInputs profileInfo={profileData} image={userImage} />
      <div className="divider" />
      <OrderList
        orders={orders}
        title={`The latest ${orders.length} booking/s`}
      />
    </Container>
  );
}
