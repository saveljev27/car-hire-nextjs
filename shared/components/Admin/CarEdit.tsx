'use client';
import Image from 'next/image';
import { Input } from '../UI/Input';
import { CustomButton, PageHeader, Select } from '../UI';
import { bodyClass, fuels, transmissions, drive } from '@/shared/constants';
import { AdminBtn, BackBtn, CarListBtn } from './NavButtons';
import { useCar } from '@/shared/hooks/useCar';
import { updateCarData } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { CarProps } from '@/types';
import { Status } from '../UI/Status';

export const CarEdit = ({ car }: { car: CarProps }) => {
  const [updateState, handleUpdate] = useFormState(updateCarData, null);
  const { carFields, carSelectFields, handleDelete } = useCar(car);

  return (
    <div className="flex flex-col justify-center items-center">
      <PageHeader>Car Edit</PageHeader>
      <div className="flex gap-3 justify-center mb-4">
        <BackBtn />
        <CarListBtn />
        <AdminBtn />
      </div>
      <div className="pt-8">
        <Image
          src={car.image}
          alt={carFields.make.value as string}
          width={300}
          height={300}
        />
      </div>
      <form action={handleUpdate}>
        <Input
          id="_id"
          name="_id"
          label="_id"
          defaultValue={car._id}
          hidden={true}
        />
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(carFields).map(([key, value]) => (
            <Input
              id={key}
              key={key}
              name={key}
              label={key}
              placeholder={key}
              defaultValue={value.value as string}
              type={value.type}
            />
          ))}
        </div>
        <Input
          id="image"
          name="image"
          label="image"
          placeholder="image"
          defaultValue={car.image}
        />
        <Select
          options={fuels}
          title="fuel_type"
          defaultValue={carSelectFields.fuel_type}
        />
        <Select
          options={drive}
          title="drive"
          defaultValue={carSelectFields.drive}
        />
        <Select
          options={bodyClass}
          title="class"
          defaultValue={carSelectFields.class}
        />
        <Select
          options={transmissions}
          title="transmission"
          defaultValue={carSelectFields.transmission}
        />

        <Status status={updateState} />
        <div className="mt-4 flex justify-end gap-4">
          <CustomButton
            title="Update"
            btnType="submit"
            containerStyles="bg-green-500"
            textStyles="text-white"
          />
          <CustomButton
            title="Delete"
            containerStyles="bg-primary-red"
            textStyles="text-white"
            handleClick={() => handleDelete({ id: car._id })}
          />
        </div>
      </form>
    </div>
  );
};
