'use server';

import { Cars } from '@/models/Cars';
import { connectToDB } from '@/lib';
export async function search(query: string) {
  try {
    await connectToDB();
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
  } catch (error) {}
}
