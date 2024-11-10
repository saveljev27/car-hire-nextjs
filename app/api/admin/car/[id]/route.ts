import { connectToDB } from '@/shared/lib';
import { Cars } from '@/shared/models/Cars';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';

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
