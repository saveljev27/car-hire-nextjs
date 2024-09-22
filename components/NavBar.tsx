'use client';

import Link from 'next/link';
import Image from 'next/image';

import CustomButton from './CustomButton';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { useSelector } from 'react-redux';
import { orderCard } from '@/redux/order/selectors';
import { useEffect, useState } from 'react';
import { CarProps } from '@/types';

const NavBar = ({ session }: { session: Session | null }) => {
  const { items } = useSelector(orderCard);
  const [clientItems, setClientItems] = useState<CarProps[]>([]);

  const userImage = session?.user?.image || 'images/default.svg';
  let userName = session?.user?.name;
  userName = userName?.split(' ')[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCar = localStorage.getItem('car');
      if (storedCar) {
        setClientItems(JSON.parse(storedCar));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const car = JSON.stringify(items);
      localStorage.setItem('car', car);
      setClientItems(items);
    }
  }, [items]);

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 max-[640px]:flex-col">
        <Link href="/" className="flex items-center ">
          <Image
            src="/images/logo.png"
            alt="Car Showcase logo"
            width={100}
            height={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain w-24 h-full"
          />
        </Link>
        <div className="flex gap-3 max-[738px]: mt-2">
          {session?.user && (
            <>
              <div className="flex gap-3 pl-3">
                <Link href="/profile" className="flex hover:text-primary-red">
                  <div className="flex justify-center items-center mr-4 max-[738px]:hidden">
                    <p>Hello, {userName}</p>
                  </div>
                  <div className="flex rounded-full justify-center items-center">
                    <Image
                      src={userImage}
                      alt="Profile"
                      height={34}
                      width={34}
                      className="rounded-full"
                    />
                  </div>
                </Link>
              </div>
              <CustomButton
                title="Logout"
                handleClick={() => signOut()}
                btnType="button"
                containerStyles="text-white rounded bg-primary-red min-w-[130px]"
              />
            </>
          )}
          {!session?.user && (
            <>
              <CustomButton
                title="Sign Up"
                btnType="button"
                containerStyles="text-white rounded bg-primary-red min-w-[130px]"
                handleClick={() => signIn('google', { callbackUrl: '/' })}
              />
            </>
          )}
          {clientItems.length > 0 && (
            <Link href="/order">
              <CustomButton
                title={`Order (${clientItems.length})`}
                btnType="button"
                containerStyles="text-white rounded bg-primary-red min-w-[130px]"
              />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
