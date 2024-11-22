'use server';

import { Container } from '@/shared/components';
import Link from 'next/link';
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
            containerStyles="interface_btn"
          />
        </Link>
        <Link href="admin-panel/bookings">
          <CustomButton
            title="All bookings"
            btnType="button"
            containerStyles="interface_btn"
          />
        </Link>
        <Link href="admin-panel/users">
          <CustomButton
            title="Registered users"
            btnType="button"
            containerStyles="interface_btn"
          />
        </Link>
        <Link href="/profile">
          <CustomButton
            title="Profile"
            btnType="button"
            containerStyles="interface_btn"
          />
        </Link>
      </div>
    </Container>
  );
}
