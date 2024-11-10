'use client';

import { Container } from '@/shared/components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomButton, Input, Select } from '@/shared/components/UI';
import { transmissions, bodyClass, fuels } from '@/shared/constants';
import Link from 'next/link';

export default function NewCar() {
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const car = {
    city_consumption: '',
    highway_consumption: '',
    combination_consumption: '',
    seats: '',
    displacement: '',
    drive: '',
    price: '',
    make: '',
    model: '',
    year: '',
    image: '',
  };

  const carId = crypto.randomUUID();

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
        router.push(`/admin-panel/car-list/${carId}`);
      }
    } catch (error) {}
  };

  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <h1 className="page__title">New Car</h1>
        <div className="flex gap-3 justify-center mb-4">
          <Link href="/admin-panel/car-list/">
            <CustomButton
              title="Back to Car List"
              containerStyles="showmore__btn"
            />
          </Link>
          <Link href="/admin-panel/">
            <CustomButton title="Admin Panel" containerStyles="showmore__btn" />
          </Link>
        </div>
        <form action={handleNewCar}>
          <div className="grid grid-cols-3 gap-3">
            <Input id="_id" name="_id" label="_id" defaultValue={carId} />
            {Object.entries(car).map(([key, value]) => (
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
