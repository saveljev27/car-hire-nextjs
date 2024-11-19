'use client';

import { Container } from '@/shared/components';
import {
  CustomButton,
  Input,
  PageHeader,
  Select,
} from '@/shared/components/UI';
import { transmissions, bodyClass, fuels, drive } from '@/shared/constants';
import { AdminBtn, CarListBtn } from '@/shared/components/Admin/NavButtons';
import { useFormState } from 'react-dom';
import { createCar } from '@/app/actions';
import { useCar } from '@/shared/hooks/useCar';
import Link from 'next/link';

export default function NewCar() {
  const carId = crypto.randomUUID();
  const { carNewFields } = useCar();
  const [newCarState, handleNewCar] = useFormState(createCar, null);

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
          <div className="flex justify-center items-center mt-5 ">
            {newCarState?.status == true ? (
              <p className="text-green-500">
                {newCarState?.message}
                <span className="text-green-600 underline ml-1">
                  <Link href={'/admin-panel/all-cars'}>Go to all cars</Link>
                </span>
              </p>
            ) : (
              <p className="text-red-500">{newCarState?.message}</p>
            )}
          </div>
          <div className="mt-4">
            <CustomButton
              title="Add"
              btnType="submit"
              containerStyles={`w-full py-[8px] mt-6 rounded bg-green-500`}
              textStyles="text-white"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
