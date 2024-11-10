'use server';

import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';
import { Container, CustomButton } from '@/shared/components';
import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { findProfileInfo } from '@/app/actions';

export default async function AdminPanel() {
  const session = await getServerSession(options);
  if (!session) redirect('/');

  const adminStatusCheck = await findProfileInfo();
  if (!adminStatusCheck.isAdmin) redirect('/');

  return (
    <Container>
      <div className="flex gap-3">
        <Link href="admin-panel/car-list">
          <CustomButton
            title="Car list"
            btnType="button"
            containerStyles="showmore__btn"
          />
        </Link>
        <Link href="admin-panel/orders">
          <CustomButton
            title="All orders"
            btnType="button"
            containerStyles="showmore__btn"
          />
        </Link>
        <Link href="admin-panel/users">
          <CustomButton
            title="Registered users"
            btnType="button"
            containerStyles="showmore__btn"
          />
        </Link>
        <Link href="/profile">
          <CustomButton
            title="Profile"
            btnType="button"
            containerStyles="showmore__btn"
          />
        </Link>
      </div>
    </Container>
  );
}
