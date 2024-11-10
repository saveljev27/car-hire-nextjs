'use client';

import { OrderInfo } from '@/types';
import { Input } from '../UI/Input';
import { Alert, Cancel, CustomButton } from '../UI';
import { useOrderInputs } from '@/shared/hooks/useOrderInputs';
import { AddressInput } from './AddressInput';

interface OrderProps {
  profileInfo: OrderInfo | null;
}

export function OrderInputs({ profileInfo }: OrderProps) {
  const { error, handleSubmit } = useOrderInputs();

  return (
    <div className="section">
      <h1 className="subtitle__text">2. Order Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 max-sm:block">
          <Input
            id="name"
            name="name"
            label="Fullname"
            placeholder="John Doe"
            defaultValue={profileInfo?.name}
          />
          <Input
            id="email"
            name="email"
            label="Email"
            placeholder="johh.doe@example.com"
            defaultValue={profileInfo?.email}
            required
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

        {error && <Alert>{error}</Alert>}

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
