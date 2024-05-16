import { connectToDB } from '@/utils';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { User } from '@/lib/models/User';

export async function PUT(req: Request) {
  connectToDB();
  const data = await req.json();
  const session = await getServerSession(options);
  const email = session?.user?.email;
  await User.updateOne({ email }, data);

  return Response.json(true);
}

export async function GET() {
  connectToDB();
  const session = await getServerSession(options);
  const email = session?.user?.email;
  return Response.json(await User.findOne({ email }));
}
