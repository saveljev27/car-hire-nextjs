'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { User } from '@/lib/models/User';
import { connectToDB } from '@/utils';

export async function saveProfile(formData: FormData) {
  await connectToDB();

  const session = await getServerSession(options);
  const email = session?.user?.email;

  const { name, phone } = Object.fromEntries(formData);

  const profileInfo = await User.findOne({ email });
  if (profileInfo) {
    profileInfo.set({ name, phone });
    await profileInfo.save();
  } else {
    await profileInfo.create({ name, phone, email });
  }

  return true;
}
