import { options } from '@/app/api/auth/[...nextauth]/options';
import { Order } from '@/lib/models/Order';
import { connectToDB } from '@/utils';
import { getServerSession } from 'next-auth/next';

export async function profileOrdersActions() {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (!email) {
    return [];
  }
  await connectToDB();
  const clientOrder = JSON.parse(
    JSON.stringify(await Order.find({ userEmail: email }))
  );
  return clientOrder;
}
