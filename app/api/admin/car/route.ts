import { Cars } from '@/shared/models/Cars';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    if (data) {
      const createCar = await Cars.create(data);

      createCar.save();

      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    console.error(error);
  }
}
