'use client';

import { DBOrderInfo } from '@/types';
import { Cancel } from '../UI';
import { CustomButton } from '../CustomButton';
import { clearItems } from '@/shared/redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

interface ConfirmationProps {
  params: { id: string };
  findOrder: DBOrderInfo;
}

export const OrderConfirmation = ({ findOrder, params }: ConfirmationProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handlePaymentMethod = async (method: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          payment: method,
          status: 'pending',
          orderId: params.id,
          totalAmount: findOrder?.rentValue,
        }),
      });
      if (response.ok) {
        router.push('/success');
        dispatch(clearItems());
      }
    } catch (error) {}
  };

  return (
    <form>
      <div className="max-md:text-xs">
        <p>Order ID: {params.id}</p>
        <div className="flex mt-3 justify-between border-b">
          <p className="font-bold mr-2">Period:</p>
          <p>
            <span className="mr-2">{findOrder?.pickupDate}</span>–
            <span className="ml-2">{findOrder?.dropDate}</span>
          </p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Pickup Time:</p>
          <p>{findOrder?.pickupTime}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Drop Time:</p>
          <p>{findOrder?.dropTime}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Make:</p>
          <p className="uppercase">{findOrder?.make?.replace(/"/g, '')}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Model:</p>
          <p className="uppercase">{findOrder?.model?.replace(/"/g, '')}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Rent Days:</p>
          <p>{findOrder?.rentDays}</p>
        </div>
        <div className="flex justify-between border-b mt-2">
          <p className="font-bold mr-2">Price Per Day:</p>
          <p>{findOrder?.rentPerDay}€</p>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between text-xl">
          <p className="font-bold mr-2">Total Price:</p>
          <p>{findOrder?.rentValue}€</p>
        </div>
      </div>
      <div className="flex justify-between gap-5 max-md:flex-col-reverse">
        <Cancel title="Order" orderId={params.id} />
        <div className="flex gap-5 max-md:flex-col">
          <CustomButton
            title={`Pay With Credit Card`}
            containerStyles="py-[8px] min-w-[200px] mt-6 rounded bg-primary-red"
            textStyles="text-white"
            handleClick={() => handlePaymentMethod('card')}
          />
          <CustomButton
            title={`Pay With Cash`}
            containerStyles="py-[8px] min-w-[200px] mt-6 rounded bg-primary-red"
            textStyles="text-white"
            handleClick={() => handlePaymentMethod('cash')}
          />
        </div>
      </div>
    </form>
  );
};
