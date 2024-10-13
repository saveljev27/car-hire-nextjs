'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { orderCard } from '../redux';

export const useOrderInputs = () => {
  const [error, setError] = useState<string | null>(null);
  const { items } = useSelector(orderCard);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { year, price, make, model } = items[0];
    const formData = new FormData(event.currentTarget);

    formData.set('year', JSON.stringify(year));
    formData.set('price', JSON.stringify(price));
    formData.set('make', JSON.stringify(make));
    formData.set('model', JSON.stringify(model));

    const pickupDateStr = formData.get('pickupDate') as string;
    const dropDateStr = formData.get('dropDate') as string;

    const pickupDate = new Date(pickupDateStr).getTime();
    const dropDate = new Date(dropDateStr).getTime();
    const today = new Date().getTime();

    if (pickupDate > dropDate) {
      setError('Pickup date cannot be greater than drop date.');
      return;
    }

    if (pickupDate <= today) {
      setError('Pickup date cannot be in the past.');
      return;
    }

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      const orderId = result.order._id;

      if (result.success) {
        router.push(`/order/${orderId}`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return { error, handleSubmit };
};
