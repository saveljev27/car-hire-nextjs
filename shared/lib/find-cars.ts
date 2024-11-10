import { Cars } from '../models/Cars';
import { connectToDB } from './db-connection';

export interface SearchParams {
  fuel?: string;
  class?: string;
  transmission?: string;
  search?: string;
  limit?: string;
}

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
