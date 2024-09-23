'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { options } from '../auth/[...nextauth]/options';

import { carRentCalculation, connectToDB, getSumFromDate } from '@/lib';
import { User } from '@/models/User';
import { Order } from '@/models/Order';

export async function GET() {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ success: false });
  }
  try {
    await connectToDB();
    const clientOrder = await Order.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    return NextResponse.json(clientOrder);
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  await connectToDB();

  const formData = await req.formData();
  const {
    email,
    pickupDate,
    dropDate,
    make,
    model,
    city_consumption,
    year,
    ...data
  } = Object.fromEntries(formData);

  const rentDays = getSumFromDate(pickupDate, dropDate);
  const priceRentPerDay = parseFloat(
    carRentCalculation(Number(city_consumption), Number(year))
  );

  try {
    const cookieStore = cookies();
    const token = crypto.randomUUID();
    const orderToken = cookieStore.set('orderToken', token);

    const userExist = await User.findOne({ email });
    if (userExist) {
      const order = await Order.create({
        ...data,
        make,
        model,
        pickupDate,
        dropDate,
        rentDays,
        rentPerDay: priceRentPerDay,
        rentValue: rentDays * priceRentPerDay,
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
        rentPerDay: priceRentPerDay,
        rentValue: rentDays * priceRentPerDay,
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
