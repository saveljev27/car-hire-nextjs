'use client'
import Link from 'next/link'
import Image from 'next/image'

import CustomButton from './CustomButton'
import { signOut, useSession } from 'next-auth/react'

const NavBar = () => {
  const { data: session, status } = useSession()

  const userImage = session?.user?.image || 'images/default.svg'
  const userName = session?.user?.name
  const userEmail = session?.user?.email

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex-justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Car Showcase logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        <div className="flex gap-3 ">
          {status === 'authenticated' && (
            <>
              <div className="flex gap-3 hover:ring-1 rounded-full pl-3">
                <Link href="/profile" className="flex">
                  <div className="flex justify-center items-center mr-4">
                    {userEmail}
                  </div>
                  <Image
                    src={userImage}
                    alt="Profile"
                    height={48}
                    width={48}
                    className="rounded-full mr-1"
                  />
                </Link>
              </div>
              <CustomButton
                title="Logout"
                handleClick={() => signOut()}
                btnType="button"
                containerStyles="text-white rounded-full hover:bg-blue-700 bg-primary-blue min-w-[130px]"
              />
            </>
          )}
          {status !== 'authenticated' && (
            <>
              <Link href="/login">
                <CustomButton
                  title="Login"
                  btnType="button"
                  containerStyles="text-white rounded-full hover:bg-blue-700 bg-primary-blue min-w-[130px]"
                />
              </Link>
              <Link href="/register">
                <CustomButton
                  title="Register"
                  btnType="button"
                  containerStyles="text-white rounded-full hover:bg-blue-700 bg-primary-blue min-w-[130px]"
                />
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
