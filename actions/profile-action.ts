'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { User } from '@/models/User';
import { connectToDB } from '@/lib';

export async function profileAction(formData: FormData) {
  const session = await getServerSession(options);
  const email = session?.user?.email;

  try {
    await connectToDB();
    const { name, phone } = Object.fromEntries(formData);
    const profileInfo = await User.findOne({ email });
    if (profileInfo) {
      profileInfo.set({ name, phone });
      await profileInfo.save();
    } else {
      await profileInfo.create({ name, phone, email });
    }
  } catch (error) {}

  return true;
}
