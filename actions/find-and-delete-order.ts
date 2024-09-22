'use server';

import { connectToDB } from '@/lib';
import { Order } from '@/models/Order';

export const findAndDeleteOrder = async (id: string) => {
  try {
    await connectToDB();
    return await Order.deleteOne({ _id: id });
  } catch (error) {}
};
