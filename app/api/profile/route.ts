'use server';

import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { User } from '@/models/User';
import { connectToDB } from '@/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(options);
  if (!session || !session.user?.email) {
    return NextResponse.json({ success: false, message: 'Not logged in' });
  }

  try {
    await connectToDB();
    const email = session.user.email;
    const profileInfo = await User.findOne({ email });

    return NextResponse.json(profileInfo);
  } catch (error) {}
}
