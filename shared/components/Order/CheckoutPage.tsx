'use client';

import { PaymentElement } from '@stripe/react-stripe-js';
import CustomButton from '../CustomButton';
import { CheckoutProps } from '@/types';
import { useCheckout } from '@/shared/hooks/useCheckout';

const CheckoutPage = ({ amount, orderId }: CheckoutProps) => {
  const {
    clientSecret,
    loading,
    errorMessage,
    stripe,
    elements,
    handleSubmit,
  } = useCheckout({ amount, orderId });

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <CustomButton
        title={!loading ? `Pay €${amount}` : 'Processing...'}
        containerStyles="py-[8px] w-full mt-6 rounded bg-primary-red"
        textStyles="text-white font-bold"
        isDisabled={!stripe || loading}
        btnType="submit"
      />
    </form>
  );
};

export default CheckoutPage;
