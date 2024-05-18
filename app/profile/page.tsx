'use server';

import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import ClientInputs from '@/components/Profile/ClientInputs';
import ProfileOrders from '@/components/Profile/ProfileOrders';
import { getDataActions } from '@/actions/getDataActions';
import { profileOrdersActions } from '@/actions/profileOrdersActions';

export default async function Profile() {
  const session = await getServerSession(options);

  if (!session) {
    return redirect('/');
  }

  const data = await getDataActions();
  const orders = await profileOrdersActions();

  return (
    <div className="flex-1 pt-36 pb-36 padding-x">
      <div className="flex justify-center flex-col items-center w-full mx-auto">
        <h1 className="profile__title">Profile Settings</h1>
        <div className="p-2 mt-10 rounded-lg relative">
          <Image
            className="rounded-full h-24 w-24"
            src={data.image || 'images/default.svg'}
            alt="Avatar"
            width={96}
            height={96}
          />
        </div>
        <ClientInputs profileInfo={data} />
        <ProfileOrders profileOrders={orders} />
      </div>
    </div>
  );
}
