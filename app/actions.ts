'use server';

import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { connectToDB } from '@/shared/lib';
import { Order } from '@/shared/models/Order';
import { User } from '@/shared/models/User';

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

export const findProfileInfo = async () => {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) return [];
  try {
    await connectToDB();
    const profileInfo = await User.findOne({ email }).select(
      'name email image phone'
    );
    return JSON.parse(JSON.stringify(profileInfo));
  } catch (error) {}
};

export const findProfileOrders = async () => {
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
  } catch (error) {}
};

export async function getConfirmationOrder() {
  const cookiesStore = cookies();
  const token = cookiesStore.get('orderToken');
  if (!token) {
    redirect('/');
  }
  try {
    await connectToDB();
    const confirmedOrder = await Order.findOne({ token: token?.value });

    return JSON.parse(JSON.stringify(confirmedOrder));
  } catch (error) {}
}
