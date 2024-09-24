import { connectToDB } from '@/shared/lib';

import { Cars } from '@/shared/models/Cars';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const carQuery = url.searchParams.get('search');
  const filterQuery = url.searchParams.get('filter');
  try {
    await connectToDB();
    if (carQuery) {
      const searchedCars = await Cars.find({
        $or: [
          { make: { $regex: carQuery, $options: 'i' } },
          { model: { $regex: carQuery, $options: 'i' } },
        ],
      }).sort({ _id: -1 });
      return new NextResponse(JSON.stringify(searchedCars), { status: 200 });
    }
    if (filterQuery) {
      const filteredCars = await Cars.find({ fuel_type: filterQuery }).sort({
        _id: -1,
      });
      return new NextResponse(JSON.stringify(filteredCars), { status: 200 });
    }

    const allCars = await Cars.find({}).sort({ _id: -1 });
    return new NextResponse(JSON.stringify(allCars), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to fetch cars', { status: 500 });
  }
};
