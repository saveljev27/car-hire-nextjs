'use client';

import { useState } from 'react';
import { profileAction } from '@/actions';
import { UserInfo } from '@/types';
import Input from '../Input';
import CustomButton from '../CustomButton';

type Props = {
  profileInfo: UserInfo | null;
};

const ClientInputs = ({ profileInfo }: Props) => {
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleFormSubmit(formData: FormData) {
    setSaved(false);
    setIsSaving(true);
    const response = await profileAction(formData);
    setIsSaving(false);
    if (response) {
      setSaved(true);
    }
  }

  return (
    <form action={handleFormSubmit}>
      {saved && <p className="text-green-500 text-center my-6">Saved!</p>}
      {isSaving && (
        <p className="text-yellow-500 text-center my-6">Saving...</p>
      )}
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
        title="Save"
        containerStyles="w-full py-[8px] mt-6 rounded-full bg-primary-red"
        textStyles="text-white"
        btnType="submit"
      />
    </form>
  );
};

export default ClientInputs;
