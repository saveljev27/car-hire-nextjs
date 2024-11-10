'use client';

import Image from 'next/image';
import { Input } from '../Input';
import { updateCarInfo } from '@/app/actions';
import { CarProps } from '@/types';
import CustomButton from '../CustomButton';
import { useState } from 'react';

interface CarInfoProps {
  car: CarProps;
  carId: string;
}

export const CarInfo = ({ car, carId }: CarInfoProps) => {
  const [saved, setSaved] = useState(false);
  const handleUpdate = async (formData: FormData) => {
    try {
      const response = await updateCarInfo(carId, formData);
      if (response) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {}
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="page__title">Car Edit</h1>
      <Image src={car.image} alt={car.make} width={300} height={300} />
      <form action={handleUpdate}>
        <div className="grid grid-cols-3 gap-3">
          {car &&
            Object.entries(car).map(([key, value]) => (
              <Input
                id={key}
                key={key}
                name={key}
                label={key}
                defaultValue={value as string | null | undefined}
              />
            ))}
        </div>
        <div className="mt-4">
          <CustomButton
            isDisabled={saved}
            title={`${saved ? 'Updated' : 'Update'}`}
            btnType="submit"
            containerStyles={`w-full py-[8px] mt-6 rounded ${
              saved ? 'bg-green-500' : 'bg-primary-red'
            }`}
            textStyles="text-white"
          />
        </div>
      </form>
    </div>
  );
};
