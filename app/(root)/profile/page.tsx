'use server';

import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { ClientInputs } from '@/shared/components/Profile';
import { findProfileInfo, findProfileOrders } from '../../actions';
import { ProfileOrderList } from '@/shared/components/Profile/ProfileOrderList';
import Link from 'next/link';
import { Container, CustomButton } from '@/shared/components';

export default async function Profile() {
  const session = await getServerSession(options);
  const userImage = session?.user?.image;

  if (!session) redirect('/');

  const profileData = await findProfileInfo();
  const orders = await findProfileOrders(false);

  return (
    <Container flexCol>
      <ClientInputs profileInfo={profileData} image={userImage} />
      <ProfileOrderList orders={orders} title="The latest 5 bookings" />
      <Link href="/profile/my-orders" className="mt-5">
        <CustomButton
          title="Show All Bookings"
          btnType="button"
          containerStyles="showmore__btn"
        />
      </Link>
    </Container>
  );
}
