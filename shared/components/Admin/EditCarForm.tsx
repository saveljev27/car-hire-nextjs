'use client';

import { CustomButton } from '../UI';
import { useCar } from '@/shared/hooks/useCar';

import { CarProps } from '@/types';
import { Status } from '../UI/Status';
import { CarContent } from './CarContent';

export const EditCarForm = ({ car }: { car: CarProps }) => {
  const { updateState, handleDelete, handleUpdate } = useCar(car);

  return (
    <form action={handleUpdate}>
      <CarContent car={car} validation={updateState} />
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
  );
};
