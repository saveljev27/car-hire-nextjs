'use server';
import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { connectToDB, getSumFromDate } from '@/shared/lib';
import { Order } from '@/shared/models/Order';
import { User } from '@/shared/models/User';
import { Cars } from '@/shared/models/Cars';
import { SearchParams } from '@/types';
import { revalidatePath } from 'next/cache';
import { OrderStatus } from '@/shared/models/OrderStatus';

// Admins actions
export const getAllBookings = async () => {
  try {
    await connectToDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error(error);
  }
};

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

// Order actions
export const findBooking = async (id: string) => {
  try {
    await connectToDB();
    const order = await Order.findById(id);
    if (order) {
      return JSON.parse(JSON.stringify(order));
    }
    return [];
  } catch (error) {}
};
export const createBooking = async (prevState: any, formData: FormData) => {
  const pickupDateStr = formData.get('pickupDate') as string;
  const dropDateStr = formData.get('dropDate') as string;
  const email = formData.get('email') as string;
  if (!email) {
    return JSON.parse(
      JSON.stringify({ status: false, message: 'Email is required.' })
    );
  }
  const price = Number(formData.get('price') as string);

  const pickupDate = new Date(pickupDateStr).getTime();
  const dropDate = new Date(dropDateStr).getTime();
  const today = new Date().getTime();
  const rentDays = getSumFromDate(pickupDate, dropDate);
  if (rentDays <= 0) {
    return JSON.parse(
      JSON.stringify({
        status: false,
        message: 'Booking duration should be greater than 1 day',
      })
    );
  }

  formData.set('rentDays', JSON.stringify(rentDays));
  formData.set('rentValue', JSON.stringify(rentDays * price));
  formData.set('rentPerDay', JSON.stringify(price));

  if (pickupDate > dropDate) {
    return JSON.parse(
      JSON.stringify({
        status: false,
        message: 'Pickup date cannot be greater than drop date.',
      })
    );
  }
  if (pickupDate <= today) {
    return JSON.parse(
      JSON.stringify({
        status: false,
        message: 'Pickup date cannot be in the past.',
      })
    );
  }

  const bookingData = Object.fromEntries(formData);
  let createBooking;

  await connectToDB();
  try {
    createBooking = await Order.create(bookingData);
  } catch (error) {
    return JSON.parse(
      JSON.stringify({ status: false, message: 'Error adding booking' })
    );
  }
  if (createBooking) {
    revalidatePath(`/order/${createBooking._id.toString()}`);
    redirect(`/order/${createBooking._id.toString()}`);
  }
};

export const updateBooking = async (prevState: any, formData: FormData) => {
  const id = formData.get('_id');
  try {
    await connectToDB();
    const bookingInfo = Object.fromEntries(formData);
    const order = await Order.findOneAndUpdate({ _id: id }, bookingInfo, {
      new: true,
    });
    await order.save();
    revalidatePath('/admin-panel/bookings');
    return JSON.parse(
      JSON.stringify({ status: true, message: 'Booking successfully updated' })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({ status: false, message: 'Error updating booking' })
    );
  }
};
export const deleteBooking = async (id: string) => {
  if (id) {
    await connectToDB();
    try {
      await Order.findByIdAndDelete(id);
      revalidatePath('/admin-panel/bookings');
      return JSON.parse(JSON.stringify({ success: true }));
    } catch (error) {}
    return JSON.parse(JSON.stringify({ success: false }));
  }
};

export const getConfirmationOnBooking = async (id: string) => {
  await connectToDB();
  try {
    const confirmedOrder = await Order.findOne({ _id: id });
    return JSON.parse(JSON.stringify(confirmedOrder));
  } catch (error) {}
};
export const findAndDeleteBooking = async (id: string) => {
  try {
    await connectToDB();
    return await Order.deleteOne({ _id: id });
  } catch (error) {}
};

export const createPaymentCard = async (formData: FormData) => {
  await connectToDB();
  const data = Object.fromEntries(formData);
  const cardPayment = {
    payment: 'cash',
    status: 'unpaid',
    orderId: data.orderId,
    totalAmount: data.totalAmount,
  };
  let createCardBooking;
  try {
    if (data) {
      const findOrder = await Order.findById(data.orderId);
      createCardBooking = await OrderStatus.create(cardPayment);
      createCardBooking.order.push(findOrder);
      return JSON.parse(
        JSON.stringify({ success: true, id: createCardBooking._id.toString() })
      );
    }
  } catch (error) {}
};

export const findBookingSuccess = async (id: string) => {
  await connectToDB();
  try {
    const confirmedOrder = await OrderStatus.findOne({ _id: id });
    return JSON.parse(JSON.stringify(confirmedOrder));
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
  await connectToDB();
  try {
    const car = await Cars.findById(id);
    return JSON.parse(JSON.stringify(car));
  } catch (error) {}
};
export const createCar = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  try {
    if (data) {
      const createCar = await Cars.create(data);
      createCar.save();
      revalidatePath('/admin-panel/all-cars');
      return JSON.parse(
        JSON.stringify({ status: true, message: 'Car successfully added' })
      );
    }
  } catch (error) {
    return JSON.parse(
      JSON.stringify({ status: false, message: 'Error adding car' })
    );
  }
};
export const updateCarData = async (prevState: any, formData: FormData) => {
  const id = formData.get('_id');
  try {
    await connectToDB();
    const carInfo = Object.fromEntries(formData);
    const car = await Cars.findOneAndUpdate({ _id: id }, carInfo, {
      new: true,
    });
    await car.save();
    revalidatePath('/admin-panel/all-cars');
    return JSON.parse(
      JSON.stringify({ status: true, message: 'Car successfully updated' })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({ status: false, message: 'Error updating car' })
    );
  }
};
export const deleteCar = async (id: string) => {
  if (id) {
    await connectToDB();
    try {
      await Cars.findByIdAndDelete(id);
      revalidatePath('/admin-panel/all-cars');
      return JSON.parse(JSON.stringify({ success: true }));
    } catch (error) {}
    return JSON.parse(JSON.stringify({ success: false }));
  }
};
