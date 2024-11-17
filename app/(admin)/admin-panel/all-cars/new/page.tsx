'use client';

import { Container } from '@/shared/components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CustomButton,
  Input,
  PageHeader,
  Select,
} from '@/shared/components/UI';
import { transmissions, bodyClass, fuels, drive } from '@/shared/constants';
import Link from 'next/link';
import { AdminBtn, CarListBtn } from '@/shared/components/Admin/NavButtons';
import { useCar } from '@/shared/hooks/useCar';

export default function NewCar() {
  const carId = crypto.randomUUID();
  const { carNewFields, handleNewCar, saved } = useCar({ carId });

  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <PageHeader>New Car</PageHeader>
        <div className="flex gap-3 justify-center mb-4">
          <CarListBtn />
          <AdminBtn />
        </div>
        <form action={handleNewCar}>
          <Input id="_id" name="_id" label="_id" defaultValue={carId} />
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(carNewFields).map(([key, value]) => (
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
          <Select options={fuels} title="fuel_type" />
          <Select options={drive} title="drive" />
          <Select options={bodyClass} title="class" />
          <Select options={transmissions} title="transmission" />
          <div className="mt-4">
            <CustomButton
              isDisabled={saved}
              title={`${saved ? 'Added' : 'Add'}`}
              btnType="submit"
              containerStyles={`w-full py-[8px] mt-6 rounded ${
                saved ? 'bg-green-500' : 'bg-primary-red'
              }`}
              textStyles="text-white"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
