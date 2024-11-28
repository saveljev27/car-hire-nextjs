'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '@/shared/lib';
import { Cars } from '@/shared/models/Cars';
import { SearchParams } from '@/types';
import { carSchema } from '@/utils/zod';

export const findCars = async (params: SearchParams, showAll = false) => {
  await connectToDB();
  const query: any = {};
  const showAllCars = showAll ? 0 : 8;
  let limit;

  if (params.limit) {
    limit = parseInt(params.limit);
  }
  if (params.fuel) {
    query.fuel_type = params.fuel;
  }
  if (params.class) {
    query.class = params.class;
  }
  if (params.transmission) {
    query.transmission = params.transmission;
  }
  if (params.search) {
    query.$or = [
      { make: { $regex: params.search, $options: 'i' } },
      { model: { $regex: params.search, $options: 'i' } },
    ];
  }

  const limitSettings = limit ? limit : showAllCars;

  try {
    const [cars, count] = await Promise.all([
      Cars.find(query).limit(limitSettings).sort({ updatedAt: -1 }),
      Cars.countDocuments(query),
    ]);

    return { cars: JSON.parse(JSON.stringify(cars)), count };
  } catch (error) {
    console.log('Error fetching cars: ', error);
    return { cars: [], count: 0 };
  }
};
export const findCar = async (id: string) => {
  await connectToDB();
  try {
    const car = await Cars.findById(id);
    return JSON.parse(JSON.stringify(car));
  } catch (error) {}
};
export const createCar = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const validation = carSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.format();
    return JSON.parse(
      JSON.stringify({
        status: false,
        message: 'Please fill in the required fields',
        errors,
      })
    );
  }
  try {
    if (data) {
      await connectToDB();
      const id = crypto.randomUUID();
      const car = {
        _id: id,
        ...data,
      };
      const createCar = await Cars.create(car);
      createCar.save();
      revalidatePath('/admin-panel/all-cars');
      return JSON.parse(
        JSON.stringify({ status: true, message: 'Car successfully added' })
      );
    }
  } catch (error) {
    return JSON.parse(
      JSON.stringify({ status: false, message: 'Error adding car' })
    );
  }
};
export const updateCarData = async (prevState: any, formData: FormData) => {
  const id = formData.get('_id');
  const data = Object.fromEntries(formData);
  const validation = carSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.format();
    return JSON.parse(
      JSON.stringify({
        status: false,
        message: 'Please fill in the required fields',
        errors,
      })
    );
  }
  try {
    await connectToDB();
    const car = await Cars.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    await car.save();
    revalidatePath('/admin-panel/all-cars');
    return JSON.parse(
      JSON.stringify({ status: true, message: 'Car successfully updated' })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({ status: false, message: 'Error updating car' })
    );
  }
};
export const deleteCar = async (id: string) => {
  if (id) {
    await connectToDB();
    try {
      await Cars.findByIdAndDelete(id);
      revalidatePath('/admin-panel/all-cars');
      return JSON.parse(JSON.stringify({ success: true }));
    } catch (error) {}
    return JSON.parse(JSON.stringify({ success: false }));
  }
};
