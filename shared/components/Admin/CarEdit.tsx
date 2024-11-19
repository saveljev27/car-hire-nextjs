'use client';
import Image from 'next/image';
import { Input } from '../UI/Input';
import { CustomButton, PageHeader, Select } from '../UI';
import { bodyClass, fuels, transmissions, drive } from '@/shared/constants';
import { AdminBtn, CarListBtn } from './NavButtons';
import { useCar } from '@/shared/hooks/useCar';
import { CarInfoSkeleton } from '../Order';
import { deleteCar, findCar, updateCarData } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { CarProps } from '@/types';
import { useRouter } from 'next/navigation';

export const CarEdit = ({ car }: { car: CarProps }) => {
  const [updateState, handleUpdate] = useFormState(updateCarData, null);
  const { carFields, carSelectFields } = useCar(car);
  const router = useRouter();

  const handleDelete = async ({ id }: { id: string }) => {
    const confirm = window.confirm('Are you sure you want to delete this car?');
    if (!confirm) return;
    const response = await deleteCar(id);
    if (response.success) {
      router.replace('/admin-panel/all-cars');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <PageHeader>Car Edit</PageHeader>
      <div className="flex gap-3 justify-center mb-4">
        <CarListBtn />
        <AdminBtn />
      </div>
      <div className="pt-8">
        <Image
          src={carFields.image}
          alt={carFields.make}
          width={300}
          height={300}
        />
      </div>
      <form action={handleUpdate}>
        <Input id="_id" name="_id" label="_id" defaultValue={car._id} />
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

        <div className="flex justify-center items-center mt-5 ">
          {updateState?.status == true ? (
            <p className="text-green-500">{updateState?.message}</p>
          ) : (
            <p className="text-red-500">{updateState?.message}</p>
          )}
        </div>
        <div className="mt-4">
          <CustomButton
            title="Update"
            btnType="submit"
            containerStyles="w-full py-[8px] mt-6 rounded bg-green-500"
            textStyles="text-white"
          />
          <CustomButton
            title="Delete"
            containerStyles="w-full py-[8px] mt-6 rounded bg-primary-red"
            textStyles="text-white"
            handleClick={() => handleDelete({ id: car._id })}
          />
        </div>
      </form>
    </div>
  );
};
