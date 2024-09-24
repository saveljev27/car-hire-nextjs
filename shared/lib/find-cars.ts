import { Cars } from '../models/Cars';

export interface SearchParams {
  fuel?: string;
  class?: string;
  search?: string;
}

export const findCars = async (params: SearchParams) => {
  const query: any = {};

  if (params.fuel) {
    query.fuel_type = params.fuel;
  }
  if (params.class) {
    query.class = params.class;
  }
  if (params.search) {
    query.$or = [
      { make: { $regex: params.search, $options: 'i' } },
      { model: { $regex: params.search, $options: 'i' } },
    ];
  }

  try {
    const cars = await Cars.find(query);
    return JSON.parse(JSON.stringify(cars));
  } catch (error) {}
};
