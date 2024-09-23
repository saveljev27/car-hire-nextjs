'use server';

import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import ClientInputs from '@/components/Profile/ClientInputs';
import ProfileOrders from '@/components/Profile/ProfileOrders';
import { DBOrderInfo } from '@/types';
import { headers } from 'next/headers';

export default async function Profile() {
  const session = await getServerSession(options);
  const userImage = session?.user?.image;

  if (!session) {
    return redirect('/');
  }
  const fetchProfileData = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/profile`, {
      method: 'GET',
      headers: headers(),
    });
    return await response.json();
  };

  const fetchOrders = async () => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/order`, {
      method: 'GET',
      headers: headers(),
    });
    return await response.json();
  };

  const profileData = (await fetchProfileData()) || {};
  const orders = (await fetchOrders()) || [];

  return (
    <div className="flex-1 pt-36 pb-36 padding-x">
      <div className="flex justify-center flex-col items-center w-full mx-auto mt-8">
        <h1 className="page__title">Profile Settings</h1>
        <div className="p-2 mt-10 rounded-lg relative">
          <Image
            className="rounded-full h-24 w-24"
            src={userImage || 'images/default.svg'}
            alt="Avatar"
            width={96}
            height={96}
          />
        </div>
        <ClientInputs profileInfo={profileData} />
        <div>
          {!orders.length || orders.length === 0 ? (
            <p className="page__title mt-5">No bookings found...</p>
          ) : (
            <>
              <h1 className="page__title mt-5">My bookings history</h1>
              {orders.map((order: DBOrderInfo) => (
                <ProfileOrders key={order._id.toString()} {...order} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
