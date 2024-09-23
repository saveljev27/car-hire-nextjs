'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Order } from '@/models/Order';
import { OrderStatus } from '@/models/OrderStatus';
import { connectToDB } from '@/lib';

export async function GET() {
  const cookiesStore = cookies();
  const token = cookiesStore.get('orderToken');
  if (!token) {
    redirect('/');
  }
  try {
    await connectToDB();
    const confirmedOrder = await Order.findOne({ token: token?.value });

    return NextResponse.json(confirmedOrder);
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  await connectToDB();

  const data = await req.json();

  try {
    if (data) {
      const findOrder = await Order.findById(data.orderId);
      const createOrder = await OrderStatus.create(data);
      createOrder.order.push(findOrder);
      createOrder.save();

      return NextResponse.json({
        success: true,
      });
    }
  } catch (error) {}
}
