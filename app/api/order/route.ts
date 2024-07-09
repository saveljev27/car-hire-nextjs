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
    const userExists = await User.findOne({ email });

    if (userExists) {
      const order = await Order.create({
        ...data,
        user: userExists._id,
        userEmail: email,
      });
      userExists.orders.push(order._id);
      await userExists.save();
      return Response.json({ success: true, order });
    } else {
      const guestOrder = await Order.create({
        ...data,
        name: data.name,
        userEmail: data.orderEmail,
        phone: data.phone,
      });
      await guestOrder.save();
      return Response.json({ success: true, order: guestOrder });
    }
  } catch (error) {
    return Response.json({
      success: false,
      message: 'An error occurred while creating an order',
      error,
    });
  }
}
