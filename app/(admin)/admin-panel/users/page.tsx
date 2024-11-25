'use server';
import { getAllUsers } from '@/app/actions';
import { Container } from '@/shared/components';
import { AdminBtn, BackBtn } from '@/shared/components/Admin/NavButtons';
import { UserList } from '@/shared/components/Admin/UserList';
import { PageHeader } from '@/shared/components/UI';

export default async function Users() {
  const users = await getAllUsers();

  return (
    <Container flexCol>
      <PageHeader>All Users ({users.length})</PageHeader>
      <div className="flex gap-3 justify-center">
        <BackBtn />
        <AdminBtn />
      </div>
      <UserList users={users} />
    </Container>
  );
}
