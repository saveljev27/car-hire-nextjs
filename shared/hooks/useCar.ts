'use client';

import { CarProps } from '@/types';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useCar = ({ carId }: { carId: string }) => {
  const [car, setCar] = useState<CarProps>();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/admin/car/${carId}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (response) {
          setCar(data.car);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [carId]);

  const handleNewCar = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const carId = data._id;
    try {
      const response = await fetch('/api/admin/car/', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.push(`/admin-panel/all-cars/${carId}`);
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/car/${carId}`, {
        method: 'DELETE',
      });
      if (response) {
        router.replace(`/admin-panel/all-cars/`);
      }
    } catch (error) {}
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      const response = await fetch(`/api/admin/car/${carId}`, {
        method: 'PATCH',
        body: formData,
      });
      console.log(response);
      if (response) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        revalidatePath('/admin-panel/all-cars/');
      }
    } catch (error) {}
  };

  const carNewFields = {
    city_consumption: '',
    highway_consumption: '',
    combination_consumption: '',
    seats: '',
    displacement: '',
    price: '',
    make: '',
    model: '',
    year: '',
    image: '',
  };

  const carFields = {
    city_consumption: car?.city_consumption || '',
    highway_consumption: car?.highway_consumption || '',
    combination_consumption: car?.combination_consumption || '',
    seats: car?.seats || '',
    displacement: car?.displacement || '',
    price: car?.price || '',
    make: car?.make || '',
    model: car?.model || '',
    year: car?.year || '',
    image: car?.image || '',
  };

  const carSelectFields = {
    drive: car?.drive || '',
    fuel_type: car?.fuel_type || '',
    class: car?.class || '',
    transmission: car?.transmission || '',
  };

  return {
    carNewFields,
    carFields,
    carSelectFields,
    loading,
    saved,
    handleNewCar,
    handleDelete,
    handleUpdate,
  };
};
