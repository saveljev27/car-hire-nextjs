'use client';

import Image from 'next/image';
import { Input } from '../UI/Input';
import { CustomButton, PageHeader, Select } from '../UI';
import { bodyClass, fuels, transmissions, drive } from '@/shared/constants';
import { AdminBtn, CarListBtn } from './NavButtons';
import { useCar } from '@/shared/hooks/useCar';
import { CarInfoSkeleton } from '../Order';

export const CarEdit = ({ carId }: { carId: string }) => {
  const {
    carFields,
    carSelectFields,
    loading,
    saved,
    handleUpdate,
    handleDelete,
  } = useCar({
    carId,
  });

  if (loading) return <CarInfoSkeleton />;

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
