import { connectToDB } from '@/shared/lib';
import { Cars } from '@/shared/models/Cars';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: Params) {
  const id = params.id;
  try {
    await connectToDB();
    const car = await Cars.findById(id);
    return NextResponse.json({ car });
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const id = params.id;
  if (id) {
    await connectToDB();
    try {
      await Cars.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    } catch (error) {}
    return NextResponse.json({ success: false });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const id = params.id;
  const data = await req.formData();
  try {
    await connectToDB();
    const carInfo = Object.fromEntries(data);
    const car = await Cars.findOneAndUpdate({ _id: id }, carInfo, {
      new: true,
    });
    await car.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
