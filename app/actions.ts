'use server';
import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { connectToDB } from '@/shared/lib';
import { Order } from '@/shared/models/Order';
import { User } from '@/shared/models/User';
import { Cars } from '@/shared/models/Cars';
import { DBOrderInfo, SearchParams } from '@/types';

// Profile actions
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

// Order actions
export const getAllOrders = async () => {
  try {
    await connectToDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    if (orders) {
      return JSON.parse(JSON.stringify(orders));
    }
    return [];
  } catch (error) {}
};
export const findOrder = async (id: string) => {
  try {
    await connectToDB();
    const order = await Order.findById(id);
    if (order) {
      return JSON.parse(JSON.stringify(order));
    }
    return [];
  } catch (error) {}
};
export const getConfirmationOrder = async () => {
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
};
export const findAndDeleteOrder = async (id: string) => {
  try {
    await connectToDB();
    return await Order.deleteOne({ _id: id });
  } catch (error) {}
};

// Car actions
export const findCars = async (params: SearchParams, showAll = false) => {
  await connectToDB();
  const query: any = {};
  const showAllCars = showAll ? 0 : 8;
  let limit;

  if (params.limit) {
    limit = parseInt(params.limit);
  }
  if (params.fuel) {
    query.fuel_type = params.fuel;
  }
  if (params.class) {
    query.class = params.class;
  }
  if (params.transmission) {
    query.transmission = params.transmission;
  }
  if (params.search) {
    query.$or = [
      { make: { $regex: params.search, $options: 'i' } },
      { model: { $regex: params.search, $options: 'i' } },
    ];
  }

  const limitSettings = limit ? limit : showAllCars;

  try {
    const [cars, count] = await Promise.all([
      Cars.find(query).limit(limitSettings).sort({ updatedAt: -1 }),
      Cars.countDocuments(query),
    ]);

    return { cars: JSON.parse(JSON.stringify(cars)), count };
  } catch (error) {
    console.log('Error fetching cars: ', error);
    return { cars: [], count: 0 };
  }
};
export const findCar = async (id: string) => {
  try {
    await connectToDB();
    const car = await Cars.findById(id);
    return JSON.parse(JSON.stringify(car));
  } catch (error) {
    return [];
  }
};
export const updateCarInfo = async (id: string, data: any) => {
  try {
    await connectToDB();
    const carInfo = Object.fromEntries(data);
    console.log(carInfo);
    const car = await Cars.findOneAndUpdate({ _id: id }, carInfo, {
      new: true,
    });
    await car.save();
  } catch (error) {
    return console.error('Update car info error', error);
  }
  return true;
};
