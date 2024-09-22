'use server';

import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Order } from '@/models/Order';
import { connectToDB } from '@/lib';

export async function profileOrdersActions() {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) {
    return [];
  }
  try {
    await connectToDB();
    const clientOrder = JSON.parse(
      JSON.stringify(await Order.find({ userEmail: email }))
    );
    return clientOrder;
  } catch (error) {}
}
