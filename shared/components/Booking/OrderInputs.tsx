'use client';

import { OrderProps } from '@/types';
import { Input } from '../UI/Input';
import { Cancel, CustomButton } from '../UI';
import { AddressInput } from './AddressInput';
import { useSelector } from 'react-redux';
import { orderCard } from '@/shared/redux';
import { useFormState } from 'react-dom';
import { createBooking } from '@/app/actions';
import { Status } from '../UI/Status';
import { useRouter } from 'next/navigation';

interface OrderInfoProps {
  profileInfo: OrderProps | null;
}

export function OrderInputs({ profileInfo }: OrderInfoProps) {
  const { items } = useSelector(orderCard);
  const router = useRouter();
  if (!items || items.length === 0 || !items[0]) {
    router.replace('/');
  }
  const { price, make, model } = items[0];
  const [bookingState, handleSubmit] = useFormState(createBooking, null);

  return (
    <div className="section">
      <h1 className="subtitle__text">2. Order Details</h1>
      <form action={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 max-sm:block">
          <Input
            id="name"
            name="name"
            label="Fullname"
            type="text"
            placeholder="John Doe"
            defaultValue={profileInfo?.name}
          />
          <Input
            id="email"
            name="email"
            label="Email"
            placeholder="johh.doe@example.com"
            type="email"
            defaultValue={profileInfo?.email}
            required
            readOnly={profileInfo?.email ? true : false}
          />
        </div>
        <Input
          id="phone"
          name="phone"
          label="Phone"
          type="number"
          defaultValue={profileInfo?.phone}
          placeholder="123 456 7890"
          required
        />
        <AddressInput />
        <Input
          id="pickupDate"
          name="pickupDate"
          type="date"
          label="Pick-up date"
          defaultValue={profileInfo?.pickupDate}
          required
        />
        <Input
          id="pickupTime"
          name="pickupTime"
          type="time"
          label="Pick-up time"
          defaultValue={profileInfo?.pickupTime}
          required
        />
        <Input
          id="dropDate"
          name="dropDate"
          type="date"
          label="Drop-off date"
          defaultValue={profileInfo?.dropDate}
          required
        />
        <Input
          id="dropTime"
          name="dropTime"
          type="time"
          label="Drop-off time"
          defaultValue={profileInfo?.dropTime}
          required
        />
        <Input id="price" name="price" hidden defaultValue={price} />
        <Input id="make" name="make" hidden defaultValue={make} />
        <Input id="model" name="model" hidden defaultValue={model} />
        <Status status={bookingState} />
        <div className="mt-10 ">
          <h1 className="subtitle__text">3. Go to Checkout</h1>
          <div className="flex  justify-between gap-5 max-md:flex-col-reverse">
            <Cancel title="Booking" />
            <CustomButton
              title="Checkout"
              containerStyles="py-[8px] min-w-[450px] mt-6 rounded bg-primary-red max-md:min-w-full"
              textStyles="text-white"
              btnType="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
