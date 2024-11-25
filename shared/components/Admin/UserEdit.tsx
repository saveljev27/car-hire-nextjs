'use client';
import { CustomButton, Input, PageHeader } from '../UI';
import { Status } from '../UI/Status';
import { useFormState } from 'react-dom';
import { UserInfo } from '@/types';
import { deleteUser, updateUser } from '@/app/actions';
import { AdminBtn, BackBtn } from './NavButtons';
import { useRouter } from 'next/navigation';

export const UserEdit = ({ user }: { user: UserInfo }) => {
  const [updateState, handleUpdate] = useFormState(updateUser, null);
  const router = useRouter();

  const handleDelete = async ({ id }: { id: string }) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (!confirm) return;
    const response = await deleteUser(id);
    if (response.success) {
      router.replace('/admin-panel/users');
    }
  };
  return (
    <form action={handleUpdate}>
      <div className="mt-10">
        <PageHeader>Update User: {user._id.toString()}</PageHeader>
        <div className="flex gap-3 justify-center">
          <BackBtn />
          <AdminBtn />
        </div>
        <Input
          id="_id"
          name="_id"
          label="_id"
          defaultValue={user._id.toString()}
          type="text"
          hidden={true}
        />
        <Input
          id="name"
          name="name"
          label="name"
          defaultValue={user.name}
          type="text"
        />
        <Input
          id="email"
          name="email"
          label="email"
          defaultValue={user.email}
          type="email"
        />
        <Input
          id="phone"
          name="phone"
          label="phone"
          defaultValue={user.phone}
          type="text"
        />
        <Status status={updateState} />
        <div className="mt-4 flex justify-end gap-4">
          <CustomButton
            title="Update"
            btnType="submit"
            containerStyles="bg-green-500"
            textStyles="text-white"
          />
          <CustomButton
            title="Delete"
            containerStyles="bg-primary-red"
            textStyles="text-white"
            handleClick={() => handleDelete({ id: user._id.toString() })}
          />
        </div>
      </div>
    </form>
  );
};
