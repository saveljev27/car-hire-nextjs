'use server';

import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { connectToDB } from '@/shared/lib';
import { Order } from '@/shared/models/Order';
import { User } from '@/shared/models/User';
import { Cars } from '@/shared/models/Cars';
import mongoose from 'mongoose';

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
      'name email image phone isAdmin'
    );
    return JSON.parse(JSON.stringify(profileInfo));
  } catch (error) {}
};

export const findProfileOrders = async (showAll = true) => {
  const limit = showAll ? 0 : 5;
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) {
    redirect('/');
  }
  try {
    await connectToDB();
    const clientsOrders = await Order.find({ email }).limit(limit).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(clientsOrders));
  } catch (error) {
    return [];
  }
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

export async function findCar(id: string) {
  try {
    await connectToDB();
    const car = await Cars.findById(id);
    return JSON.parse(JSON.stringify(car));
  } catch (error) {
    return [];
  }
}

export async function updateCarInfo(id: string, data: any) {
  try {
    await connectToDB();
    const carInfo = Object.fromEntries(data);
    const car = await Cars.findOneAndUpdate({ _id: id }, carInfo, {
      new: true,
    });
    await car.save();
  } catch (error) {
    return console.error('Update car info error', error);
  }
  return true;
}
