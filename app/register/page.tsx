'use client';

import { useState, FormEventHandler, ChangeEvent, FC } from 'react';
import Input from '@/components/Input';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    setErrorMessage('');
    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      setErrorMessage(res.message);
    } else {
      router.refresh();
      router.push('/login');
    }
  };

  return (
    <div className="flex-1 pt-36 pb-36 padding-x ">
      <h1 className="login__title">Register</h1>
      <p className="text-red-500 text-center my-6">{errorMessage}</p>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <Input
          label="Name"
          id="name"
          name="name"
          type="name"
          placeholder="Brain"
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="john@google.com"
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="********"
        />
        <div className="mt-3">
          Existing account?
          <Link href="/login" className="ml-1 text-primary-red">
            You can login here!
          </Link>
        </div>
        <CustomButton
          title="Register"
          containerStyles="w-full py-[8px] mt-6 rounded-full bg-primary-red hover:bg-blue-700"
          textStyles="text-white text-[14px] leading-[17px] font-bold"
          btnType="submit"
        />
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex w-full my-6 py-[8px] rounded-full ring-1 hover:ring gap-2 text-center hover:bg-neutral-50 bg-white justify-center"
          type="button"
        >
          <Image
            src={'/images/google.svg'}
            alt="Google"
            height={24}
            width={24}
          ></Image>
          Sign Up With Google
        </button>
      </form>
    </div>
  );
};

export default Register;
