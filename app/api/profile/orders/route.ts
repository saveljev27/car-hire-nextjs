'use server';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { connectToDB } from '@/shared/lib';
import { Order } from '@/shared/models/Order';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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
    return NextResponse.json({ orders: clientsOrders });
  } catch (error) {
    return NextResponse.json([]);
  }
}
