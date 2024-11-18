import { connectToDB } from '@/shared/lib';
import { Order } from '@/shared/models/Order';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
  }
}
