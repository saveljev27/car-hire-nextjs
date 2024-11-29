'use client';
import { signIn } from 'next-auth/react';
import { Container } from '../Container';
import { CustomButton } from '../UI';

export const BookingLogin = () => {
  return (
    <Container flexCol>
      <h1>You need to be logged in to book a car. </h1>
      <div className="mt-4">
        <CustomButton
          title="Sign Up"
          btnType="button"
          containerStyles="text-white rounded bg-primary-red min-w-[130px]"
          handleClick={() => signIn('google', { callbackUrl: '/' })}
        />
      </div>
    </Container>
  );
};
