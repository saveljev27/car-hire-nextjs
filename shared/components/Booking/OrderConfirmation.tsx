'use client';

import { DBOrderInfo } from '@/types';
import { Cancel, CustomButton } from '../UI';
import { Elements } from '@stripe/react-stripe-js';
import { convertToSubcurrency } from '@/shared/lib';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutPage } from './CheckoutPage';
import { useState } from 'react';
import { createPaymentCard } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearItems } from '@/shared/redux';

interface ConfirmationProps {
  params: { id: string };
  findOrder: DBOrderInfo;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export const OrderConfirmation = ({ findOrder, params }: ConfirmationProps) => {
  const {
    address,
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

  const [payCard, setPayCard] = useState(false);
  const toogleCard = () => setPayCard(!payCard);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <form
        action={async (data) => {
          const res = await createPaymentCard(data);
          if (res.success) {
            dispatch(clearItems());
            router.replace(`/success/?order=${res.id}`);
          }
        }}
      >
        <div className="max-md:text-xs">
          <p>Booking ID: {params.id}</p>
          <div className="flex mt-3 justify-between border-b">
            <p className="font-bold mr-2">Period:</p>
            <p>
              <span className="mr-2">{pickupDate}</span>–
              <span className="ml-2">{dropDate}</span>
            </p>
          </div>
          <div className="flex justify-between border-b mt-2">
            <p className="font-bold mr-2">Pickup Address:</p>
            <p>{address}</p>
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
            <input type="hidden" name="totalAmount" value={rentValue} />
            <input type="hidden" name="orderId" value={params.id} />
          </div>
        </div>
        <div className="flex justify-between gap-5 max-md:flex-col-reverse">
          <Cancel title="Order" orderId={params.id} />
          <div className="flex gap-5">
            <CustomButton
              title="Pay With Card"
              containerStyles="py-[8px] mt-6 rounded bg-primary-red"
              textStyles="text-white"
              handleClick={toogleCard}
            />
            <CustomButton
              title="Pay With Cash"
              containerStyles="py-[8px] mt-6 rounded bg-primary-red"
              textStyles="text-white"
              btnType="submit"
            />
          </div>
        </div>
      </form>
      {payCard && (
        <div className="mt-10">
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
      )}
    </>
  );
};
