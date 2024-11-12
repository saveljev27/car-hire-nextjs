'use server';

import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';
import { Container } from '@/shared/components';
import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { findProfileInfo } from '@/app/actions';
import { CustomButton, PageHeader } from '@/shared/components/UI';

export default async function AdminPanel() {
  return (
    <Container flexCol>
      <PageHeader>Admin panel</PageHeader>
      <div className="flex gap-3">
        <Link href="admin-panel/all-cars">
          <CustomButton
            title="All cars"
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
