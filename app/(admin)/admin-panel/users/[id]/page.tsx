'use server';
import { findUser } from '@/app/actions';
import { Container } from '@/shared/components';
import { AdminBtn, BackBtn } from '@/shared/components/Admin/NavButtons';
import { UserEdit } from '@/shared/components/Admin/UserEdit';

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await findUser(params?.id);
  return (
    <Container flexCol>
      <UserEdit user={user} />
    </Container>
  );
}
