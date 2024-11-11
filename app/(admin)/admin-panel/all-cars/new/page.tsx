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

export default function NewCar() {
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const car = {
    city_consumption: '',
    highway_consumption: '',
    combination_consumption: '',
    seats: '',
    displacement: '',
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
        router.push(`/admin-panel/all-cars/${carId}`);
      }
    } catch (error) {}
  };

  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <PageHeader>New Car</PageHeader>
        <div className="flex gap-3 justify-center mb-4">
          <Link href="/admin-panel/all-cars/">
            <CustomButton
              title="Back to All Cars List"
              containerStyles="showmore__btn"
            />
          </Link>
          <Link href="/admin-panel/">
            <CustomButton title="Admin Panel" containerStyles="showmore__btn" />
          </Link>
        </div>
        <form action={handleNewCar}>
          <Input id="_id" name="_id" label="_id" defaultValue={carId} />
          <div className="grid grid-cols-3 gap-3">
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
