'use server';

import { Cars } from '@/models/Cars';
export async function search(query: string) {
  const car = JSON.parse(
    JSON.stringify(
      await Cars.find({
        $or: [
          { make: { $regex: query, $options: 'i' } },
          { model: { $regex: query, $options: 'i' } },
        ],
      })
    )
  );
  return car;
}
