'use server';

import { NextRequest, NextResponse } from 'next/server';

import { Order } from '@/shared/models/Order';
import { OrderStatus } from '@/shared/models/OrderStatus';
import { connectToDB } from '@/shared/lib';

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
