'use server';

import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { ClientInputs } from '@/shared/components/Profile';
import { findProfileInfo, userProfileOrders } from '../../actions';
import { BookingList, Container } from '@/shared/components';

export default async function Profile() {
  const session = await getServerSession(options);
  const userImage = session?.user?.image;

  if (!session) redirect('/');

  const profileData = await findProfileInfo();
  const profileOrders = await userProfileOrders();

  return (
    <Container flexCol>
      <ClientInputs profileInfo={profileData} image={userImage} />
      <div className="divider" />
      <BookingList
        orders={profileOrders}
        title={`Your last (${profileOrders.length}) booking/s`}
      />
    </Container>
  );
}
