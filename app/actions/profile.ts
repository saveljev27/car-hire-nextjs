'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { connectToDB } from '@/shared/lib';
import { Order } from '@/shared/models/Order';
import { User } from '@/shared/models/User';

export const profileAction = async (prevState: any, formData: FormData) => {
  const session = await getServerSession(options);
  const email = session?.user?.email;

  try {
    await connectToDB();
    const { name, phone } = Object.fromEntries(formData);
    const profileInfo = await User.findOne({ email });
    if (profileInfo) {
      profileInfo.set({ name, phone });
      await profileInfo.save();
      revalidatePath('/profile');
      return JSON.parse(
        JSON.stringify({
          status: true,
          message: 'Profile successfully updated',
        })
      );
    }
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: false,
        message: 'Something went wrong',
      })
    );
  }
};
export const findProfileInfo = async () => {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) return [];
  try {
    await connectToDB();
    const profileInfo = await User.findOne({ email }).select(
      'name email image phone isAdmin'
    );
    return JSON.parse(JSON.stringify(profileInfo));
  } catch (error) {}
};
export const userProfileBookings = async () => {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) {
    redirect('/');
  }
  try {
    await connectToDB();
    const clientsOrders = await Order.find({ email }).limit(5).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(clientsOrders));
  } catch (error) {
    return JSON.parse(JSON.stringify([]));
  }
};
export const userAllProfileBookings = async () => {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) {
    redirect('/');
  }
  try {
    await connectToDB();
    const clientsOrders = await Order.find({ email }).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(clientsOrders));
  } catch (error) {
    return JSON.parse(JSON.stringify([]));
  }
};
