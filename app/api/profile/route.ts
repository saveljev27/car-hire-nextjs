import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { connectToDB } from '@/lib';
import { User } from '@/models/User';

export async function PUT(req: NextRequest) {
  connectToDB();
  const data = await req.json();
  const session = await getServerSession(options);
  const email = session?.user?.email;
  await User.updateOne({ email }, data);

  return NextResponse.json(true);
}

export async function GET() {
  connectToDB();
  const session = await getServerSession(options);
  const email = session?.user?.email;
  return NextResponse.json(await User.findOne({ email }));
}
