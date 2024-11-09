'use client';

import Image from 'next/image';
import { useState } from 'react';
import { profileAction } from '@/app/actions';
import { UserInfo } from '@/types';
import CustomButton from '../CustomButton';
import { Input } from '../Input';
import Link from 'next/link';

type Props = {
  profileInfo: UserInfo | null;
  image?: string | null;
};

export const ClientInputs = ({ profileInfo, image }: Props) => {
  const [saved, setSaved] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const response = await profileAction(formData);
      if (response) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {}
  };

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
      <CustomButton
        isDisabled={saved}
        title={`${saved ? 'Saved' : 'Save'}`}
        containerStyles={`w-full py-[8px] mt-6 rounded ${
          saved ? 'bg-green-500' : 'bg-primary-red'
        }`}
        textStyles="text-white"
        btnType="submit"
      />
      {profileInfo?.isAdmin && (
        <Link href={`/admin-panel/`}>
          <CustomButton
            title="Admin Panel"
            containerStyles={`w-full py-[8px] mt-6 rounded bg-primary-red`}
            textStyles="text-white"
            btnType="button"
          />
        </Link>
      )}
    </form>
  );
};
