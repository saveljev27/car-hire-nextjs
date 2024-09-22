'use server';

import { connectToDB } from '@/lib';
import { Order } from '@/models/Order';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function findConfirmationOrder({
  params,
}: {
  params: { id: string };
}) {
  const cookiesStore = cookies();
  const token = cookiesStore.get('orderToken');
  if (!token && !params.id) {
    redirect('/');
  }
  try {
    await connectToDB();
    return JSON.parse(
      JSON.stringify(await Order.findOne({ token: token?.value }))
    );
  } catch (error) {}
}
