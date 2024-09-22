'use client';

import { useState } from 'react';
import Input from '../Input';
import CustomButton from '../CustomButton';
import Alert from '../UI/Alert';
import { OrderInfo } from '@/types';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { orderCard } from '@/redux/order/selectors';
import Cancel from '../UI/Cancel';

interface OrderProps {
  profileInfo: OrderInfo | null;
}

export default function OrderInputs({ profileInfo }: OrderProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { items } = useSelector(orderCard);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { year, city_consumption, make, model } = items[0];
    const formData = new FormData(event.currentTarget);
    formData.set('year', JSON.stringify(year));
    formData.set('city_consumption', JSON.stringify(city_consumption));
    formData.set('make', JSON.stringify(make));
    formData.set('model', JSON.stringify(model));
    console.log(formData);
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      const orderId = result.order._id;

      if (result.success) {
        setSuccess(true);
        router.push(`/order/${orderId}`);
        console.log('Order created:', result.order);
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 max-[540px]:block">
        <Input
          id="name"
          name="name"
          label="Fullname"
          defaultValue={profileInfo?.name}
        />
        <Input
          id="email"
          name="email"
          label="Email"
          defaultValue={profileInfo?.email}
        />
      </div>
      <Input
        id="phone"
        name="phone"
        label="Phone"
        defaultValue={profileInfo?.phone}
        required
      />
      <Input
        id="pickupLocation"
        name="pickupLocation"
        label="Pick-up location"
        defaultValue={profileInfo?.address}
        required
      />
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
      {success && <Alert>Order created successfully!</Alert>}

      <div className="flex justify-center gap-5 max-md:flex-col-reverse">
        <Cancel title="Booking" />
        <CustomButton
          title="Book"
          containerStyles="py-[8px] min-w-[350px] mt-6 rounded bg-primary-red max-md:min-w-full"
          textStyles="text-white"
          btnType="submit"
        />
      </div>
    </form>
  );
}
