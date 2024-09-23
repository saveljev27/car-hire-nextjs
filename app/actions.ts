'use server';

import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';

import { connectToDB } from '@/lib';
import { Order } from '@/models/Order';
import { User } from '@/models/User';
import { Cars } from '@/models/Cars';

export const findAndDeleteOrder = async (id: string) => {
  try {
    await connectToDB();
    return await Order.deleteOne({ _id: id });
  } catch (error) {}
};

export const profileAction = async (formData: FormData) => {
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
};
