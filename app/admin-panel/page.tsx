'use server';

import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { findProfileInfo } from '../actions';

export default async function AdminPanel() {
  const session = await getServerSession(options);
  if (!session) redirect('/');

  const adminStatusCheck = await findProfileInfo();
  if (!adminStatusCheck.isAdmin) redirect('/');

  return (
    <div className="pt-36 pb-36 padding-x">
      <div className="flex justify-center flex-col items-center w-full mx-auto">
        <h1>Adminka</h1>
      </div>
    </div>
  );
}
