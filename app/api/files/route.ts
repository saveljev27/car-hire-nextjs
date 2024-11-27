import { NextResponse, type NextRequest } from 'next/server';
import { pinata } from '@/utils/config';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const uploadData = await pinata.upload.file(file, {
      groupId: '01936982-72f7-78ee-aef4-6384636506a7',
    });
    const fileUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}