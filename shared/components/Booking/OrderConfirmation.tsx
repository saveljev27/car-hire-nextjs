'use client';

import { DBOrderInfo } from '@/types';
import { Cancel } from '../UI';
import { Elements } from '@stripe/react-stripe-js';
import { convertToSubcurrency } from '@/shared/lib';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutPage } from './CheckoutPage';

interface ConfirmationProps {
  params: { id: string };
  findOrder: DBOrderInfo;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export const OrderConfirmation = ({ findOrder, params }: ConfirmationProps) => {
  const {
    pickupDate,
    dropDate,
    pickupTime,
    dropTime,
    make,
    model,
    rentDays,
    rentValue,
    rentPerDay,
  } = findOrder;

  return (
    <>
      <div className="max-md:text-xs">
        <p>Order ID: {params.id}</p>
        <div className="flex mt-3 justify-between border-b">
          <p className="font-bold mr-2">Period:</p>
          <p>
            <span className="mr-2">{pickupDate}</span>–
            <span className="ml-2">{dropDate}</span>
          </p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Pickup Time:</p>
          <p>{pickupTime}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Drop Time:</p>
          <p>{dropTime}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Make:</p>
          <p className="uppercase">{make?.replace(/"/g, '')}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Model:</p>
          <p className="uppercase">{model?.replace(/"/g, '')}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Rent Days:</p>
          <p>{rentDays}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Price Per Day:</p>
          <p>{rentPerDay}€</p>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between text-xl">
          <p className="font-bold mr-2">Total Price:</p>
          <p>€{rentValue}</p>
        </div>
      </div>
      <div className="flex justify-between gap-5 max-md:flex-col-reverse">
        <Cancel title="Order" orderId={params.id} />
      </div>

      <div className="mt-5">
        <Elements
          stripe={stripePromise}
          options={{
            mode: 'payment',
            amount: convertToSubcurrency(rentValue),
            currency: 'eur',
          }}
        >
          <CheckoutPage amount={rentValue} orderId={params.id} />
        </Elements>
      </div>
    </>
  );
};
