import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';

import { connectToDB } from '@/utils';
import { Order } from '@/lib/models/Order';
import { User } from '@/lib/models/User';

export async function POST(req: Request) {
  connectToDB();
  const data = await req.json();
  const session = await getServerSession(options);

  const email = session?.user?.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({
        success: false,
        message: 'User not found',
      });
    }

    const order = await Order.create({
      ...data,
      user: user._id,
      userEmail: email,
    });
    user.orders.push(order._id);
    await user.save();

    return Response.json({ success: true, order });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'An error occurred while creating an order',
      error,
    });
  }
}
