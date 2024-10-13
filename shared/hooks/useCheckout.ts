'use client';

import React, { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { convertToSubcurrency } from '@/shared/lib/convert-to-subcurrency';
import { clearItems } from '@/shared/redux';
import { useDispatch } from 'react-redux';
import { CheckoutProps } from '@/types';

export const useCheckout = ({ amount, orderId }: CheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    try {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment: 'card',
          status: 'paid',
          orderId,
          totalAmount: amount,
        }),
      });
      dispatch(clearItems());
    } catch (error) {
      console.error(error);
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/success?amount=${amount}`,
      },
    });

    if (error) setErrorMessage(error.message);
    setLoading(false);
  };

  return {
    clientSecret,
    loading,
    errorMessage,
    stripe,
    elements,
    handleSubmit,
  };
};
