'use server';

import { Container } from '@/shared/components';
import { ProfileOrderList } from '@/shared/components/Profile/ProfileOrderList';

export default async function MyOrders() {
  return (
    <Container flexCol>
      <ProfileOrderList title="All Bookings" page admin={false} limit={0} />
    </Container>
  );
}
