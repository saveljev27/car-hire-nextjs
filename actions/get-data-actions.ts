'use server';

import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { User } from '@/models/User';
import { connectToDB } from '@/lib';

export async function getDataActions() {
  const session = await getServerSession(options);
  if (!session || !session.user?.email) {
    return 'Not logged in';
  }
  const email = session.user.email;

  await connectToDB();
  const profileInfoDoc = JSON.parse(
    JSON.stringify(await User.findOne({ email }))
  );
  return profileInfoDoc;
}
