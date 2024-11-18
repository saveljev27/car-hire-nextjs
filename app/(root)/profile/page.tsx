'use server';

import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { ClientInputs } from '@/shared/components/Profile';
import { findProfileInfo } from '../../actions';
import { Container } from '@/shared/components';
import { ProfileOrderList } from '@/shared/components/Profile/ProfileOrderList';

export default async function Profile() {
  const session = await getServerSession(options);
  const userImage = session?.user?.image;

  if (!session) redirect('/');

  const profileData = await findProfileInfo();

  return (
    <Container flexCol>
      <ClientInputs profileInfo={profileData} image={userImage} />
      <div className="divider" />
      <ProfileOrderList
        title="Last booking/s"
        page={false}
        admin={false}
        limit={5}
      />
    </Container>
  );
}
