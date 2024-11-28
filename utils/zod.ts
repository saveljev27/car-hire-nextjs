import { z } from 'zod';

export const carSchema = z.object({
  image: z.string().min(1, { message: 'Image is required' }),
  city_consumption: z
    .string()
    .min(1, { message: 'City consumption is required' }),
  highway_consumption: z.string().min(1, {
    message: 'Highway consumption is required',
  }),
  combination_consumption: z.string().min(1, {
    message: 'Combination consumption is required',
  }),
  seats: z.string().min(1, {
    message: 'Seats is required',
  }),
  displacement: z.string().min(1, {
    message: 'Displacement is required',
  }),
  price: z.string().min(1, {
    message: 'Price is required',
  }),
  make: z.string().min(1, {
    message: 'Make is required',
  }),
  model: z.string().min(1, {
    message: 'Model is required',
  }),
  year: z.string().min(1, {
    message: 'Year is required',
  }),
  drive: z.string().min(1, {
    message: 'Drive is required',
  }),
  fuel_type: z.string().min(1, {
    message: 'Fuel type is required',
  }),
  class: z.string().min(1, {
    message: 'Class is required',
  }),
  transmission: z.string().min(1, {
    message: 'Transmission is required',
  }),
});
