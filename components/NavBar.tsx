'use client';
import Link from 'next/link';
import Image from 'next/image';

import CustomButton from './CustomButton';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const NavBar = ({ session }: { session: Session | null }) => {
  const userImage = session?.user?.image || 'images/default.svg';
  let userName = session?.user?.name;
  userName = userName?.split(' ')[0];

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 ">
        <Link href="/" className="flex items-center max-[738px]:hidden ">
          <Image
            src="/logo.png"
            alt="Car Showcase logo"
            width={100}
            height={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain w-24 h-full"
          />
        </Link>
        <div className="flex gap-3 ">
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
                containerStyles="text-white rounded-full bg-primary-red min-w-[130px]"
              />
              <Link href="/order">
                <CustomButton
                  title="Order"
                  btnType="button"
                  containerStyles="text-white rounded-full bg-primary-red min-w-[130px]"
                />
              </Link>
            </>
          )}
          {!session?.user && (
            <>
              <CustomButton
                title="Sign Up"
                btnType="button"
                containerStyles="text-white rounded-full hover:bg-blue-700 bg-primary-red min-w-[130px]"
                handleClick={() => signIn('google', { callbackUrl: '/' })}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
