'use client';

import Image from 'next/image';
import { Input } from '../UI/Input';
import { updateCarInfo } from '@/app/actions';
import { CarProps } from '@/types';
import { useState } from 'react';
import { CustomButton, PageHeader, Select } from '../UI';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { bodyClass, fuels, transmissions, drive } from '@/shared/constants';
import { AdminBtn, CarListBtn } from './NavButtons';

interface CarInfoProps {
  car: CarProps;
  carId: string;
}

export const CarInfo = ({ car, carId }: CarInfoProps) => {
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const carFields = {
    city_consumption: car.city_consumption || '',
    highway_consumption: car.highway_consumption || '',
    combination_consumption: car.combination_consumption || '',
    seats: car.seats || '',
    displacement: car.displacement || '',
    price: car.price || '',
    make: car.make || '',
    model: car.model || '',
    year: car.year || '',
    image: car.image || '',
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
      const response = await updateCarInfo(carId, formData);
      if (response) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        revalidatePath('/admin-panel/all-cars/');
      }
    } catch (error) {}
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <PageHeader>Car Edit</PageHeader>
      <div className="flex gap-3 justify-center mb-4">
        <CarListBtn />
        <AdminBtn />
      </div>
      <div className="pt-8">
        <Image src={car.image} alt={car.make} width={300} height={300} />
      </div>
      <form action={handleUpdate}>
        <Input id="_id" name="_id" label="_id" defaultValue={carId} />
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(carFields).map(([key, value]) => (
            <Input
              id={key}
              key={key}
              name={key}
              label={key}
              placeholder={key}
              defaultValue={value as string | null | undefined}
            />
          ))}
        </div>
        <Select
          options={fuels}
          title="fuel_type"
          defaultValue={car.fuel_type}
        />
        <Select options={drive} title="drive" defaultValue={car.drive} />
        <Select options={bodyClass} title="class" defaultValue={car.class} />
        <Select
          options={transmissions}
          title="transmission"
          defaultValue={car.transmission}
        />
        <div className="mt-4">
          <CustomButton
            isDisabled={saved}
            title={`${saved ? 'Updating...' : 'Update'}`}
            btnType="submit"
            containerStyles="w-full py-[8px] mt-6 rounded bg-green-500"
            textStyles="text-white"
          />
          <CustomButton
            title="Delete"
            containerStyles="w-full py-[8px] mt-6 rounded bg-primary-red"
            textStyles="text-white"
            handleClick={handleDelete}
          />
        </div>
      </form>
    </div>
  );
};
