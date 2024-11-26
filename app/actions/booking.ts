'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { connectToDB, getSumFromDate } from '@/shared/lib';
import { Order } from '@/shared/models/Order';
import { OrderStatus } from '@/shared/models/OrderStatus';

export const getAllBookings = async () => {
  try {
    await connectToDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error(error);
  }
};
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
export const findBookingStatus = async (id: string) => {
  await connectToDB();
  try {
    const bookingStatus = await OrderStatus.findOne({ orderId: id });
    return JSON.parse(JSON.stringify(bookingStatus));
  } catch (error) {}
};
