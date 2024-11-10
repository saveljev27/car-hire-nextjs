'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDB, getSumFromDate } from '@/shared/lib';
import { User } from '@/shared/models/User';
import { Order } from '@/shared/models/Order';

export async function POST(req: NextRequest) {
  await connectToDB();

  const formData = await req.formData();
  const { email, pickupDate, dropDate, make, model, price, year, ...data } =
    Object.fromEntries(formData);

  const rentDays = getSumFromDate(pickupDate, dropDate);

  try {
    const cookieStore = cookies();
    const token = crypto.randomUUID();
    cookieStore.set('orderToken', token);

    const userExist = await User.findOne({ email });
    if (userExist) {
      const order = await Order.create({
        ...data,
        make,
        model,
        pickupDate,
        dropDate,
        rentDays,
        rentPerDay: price,
        rentValue: rentDays * Number(price),
        email,
        token,
      });

      userExist.orders.push(order._id);
      await userExist.save();
      return NextResponse.json({ success: true, order });
    } else {
      const guestOrder = await Order.create({
        ...data,
        make,
        model,
        pickupDate,
        dropDate,
        rentDays,
        rentPerDay: price,
        rentValue: rentDays * Number(price),
        email,
        token,
      });
      await guestOrder.save();
      return NextResponse.json({ success: true, order: guestOrder });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
    });
  }
}
