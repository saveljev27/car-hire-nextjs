'use client';

import Image from 'next/image';
import { profileAction } from '@/app/actions';
import { UserInfo } from '@/types';
import { Input } from '../UI/Input';
import Link from 'next/link';
import { CustomButton } from '../UI';
import { useFormState } from 'react-dom';
import { Status } from '../UI/Status';

type Props = {
  profileInfo: UserInfo | null;
  image?: string | null;
};

export const ClientInputs = ({ profileInfo, image }: Props) => {
  const [profileUpdateState, handleFormSubmit] = useFormState(
    profileAction,
    null
  );

  return (
    <form action={handleFormSubmit}>
      <div className="flex flex-col justify-center items-center p-2 rounded-lg relative">
        <h1 className="page__title">Profile Settings</h1>
        <Image
          className="rounded-full h-24 w-24"
          src={image || 'images/default.svg'}
          alt="Avatar"
          width={96}
          height={96}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="name"
          name="name"
          label="Fullname"
          defaultValue={profileInfo?.name}
        />
        <Input
          id="email"
          name="email"
          label="Email"
          defaultValue={profileInfo?.email}
          disabled
        />
      </div>
      <Input
        id="phone"
        name="phone"
        label="Phone"
        defaultValue={profileInfo?.phone}
      />
      <Status status={profileUpdateState} />
      <div className="flex flex-col justify-center items-center gap-3 mt-4">
        <CustomButton
          title="Save"
          containerStyles={`bg-primary-red`}
          textStyles="text-white"
          btnType="submit"
        />
        {profileInfo?.isAdmin && (
          <Link href={`/admin-panel/`}>
            <CustomButton
              title="Admin Panel"
              containerStyles={`bg-primary-red`}
              textStyles="text-white"
              btnType="button"
            />
          </Link>
        )}
      </div>
    </form>
  );
};
