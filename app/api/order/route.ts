import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { options } from '@/app/api/auth/[...nextauth]/options';

import { connectToDB } from '@/lib';
import { Order } from '@/models/Order';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  connectToDB();
  const data = await req.json();
  const session = await getServerSession(options);
  const email = session?.user?.email;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      const order = await Order.create({
        ...data,
        user: userExists._id,
        userEmail: email,
      });
      userExists.orders.push(order._id);
      await userExists.save();
      return NextResponse.json({ success: true, order });
    } else {
      const guestOrder = await Order.create({
        ...data,
        name: data.name,
        userEmail: data.orderEmail,
        phone: data.phone,
      });
      await guestOrder.save();
      return NextResponse.json({ success: true, order: guestOrder });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'An error occurred while creating an order',
      error,
    });
  }
}
