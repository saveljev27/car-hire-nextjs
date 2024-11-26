'use client';

import { useFormState } from 'react-dom';
import { Container } from '@/shared/components';
import {
  CustomButton,
  Input,
  PageHeader,
  Select,
} from '@/shared/components/UI';
import { transmissions, bodyClass, fuels, drive } from '@/shared/constants';
import {
  AdminBtn,
  BackBtn,
  CarListBtn,
} from '@/shared/components/Admin/NavButtons';

import { useCar } from '@/shared/hooks/useCar';
import { Status } from '@/shared/components/UI/Status';
import { createCar } from '@/app/actions/car';

export default function NewCar() {
  const carId = crypto.randomUUID();
  const { carNewFields } = useCar();
  const [newCarState, handleNewCar] = useFormState(createCar, null);

  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <PageHeader>New Car</PageHeader>
        <div className="flex gap-3 justify-center mb-4">
          <BackBtn />
          <CarListBtn />
          <AdminBtn />
        </div>
        <form action={handleNewCar}>
          <Input id="_id" name="_id" label="_id" defaultValue={carId} hidden />
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(carNewFields).map(([key, value]) => (
              <Input
                id={key}
                key={key}
                name={key}
                label={key}
                placeholder={key}
                type={value.type}
              />
            ))}
          </div>
          <Input id="image" name="image" label="image" placeholder="image" />
          <Select options={fuels} title="fuel_type" />
          <Select options={drive} title="drive" />
          <Select options={bodyClass} title="class" />
          <Select options={transmissions} title="transmission" />
          <Status status={newCarState} />
          <div className="mt-4 flex justify-end">
            <CustomButton
              title="Add"
              btnType="submit"
              containerStyles="bg-green-500"
              textStyles="text-white"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
