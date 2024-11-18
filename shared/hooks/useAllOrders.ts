'use client';
import { useEffect, useState } from 'react';

const useAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/order/', {
          method: 'GET',
        });
        const data = await response.json();
        if (response) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);

  return { orders, loading };
};

export default useAllOrders;
