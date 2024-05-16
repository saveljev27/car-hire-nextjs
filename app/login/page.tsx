'use client';
import { useState, FormEventHandler, ChangeEvent, FC } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Input from '@/components/Input';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and password fields required!');
      return;
    }

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex-1 pt-36 pb-36 padding-x">
      <h1 className="login__title">Login</h1>
      <p className="text-red-500 text-center my-6">{errorMessage}</p>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <Input
          label="Email"
          id="email"
          name="email"
          defaultValue={email}
          placeholder="test@example.com"
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setEmail(ev.target.value)
          }
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          defaultValue={password}
          placeholder="********"
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setPassword(ev.target.value)
          }
        />
        <div className="mt-3">
          First time?
          <Link href="/register" className="ml-1 text-primary-red">
            Create an account
          </Link>
        </div>
        <CustomButton
          title="Login"
          btnType="submit"
          containerStyles="w-full py-[8px] mt-6 rounded-full bg-primary-red hover:bg-blue-700"
          textStyles="text-white text-[14px] leading-[17px] font-bold"
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
          Login In With Google
        </button>
      </form>
    </div>
  );
};

export default Login;
