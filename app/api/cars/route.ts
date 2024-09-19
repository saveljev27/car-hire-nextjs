import { connectToDB } from '@/lib';

import { Cars } from '@/models/Cars';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectToDB();

    const cars = await Cars.find({});
    return new NextResponse(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to fetch all prompts', { status: 500 });
  }
};
