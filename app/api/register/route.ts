import bcrypt from 'bcrypt';
import { connectToDB } from '@/utils';
import { User } from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name;
    const email = body.email;
    const pass = body.password;

    if (!email || !pass || !name) {
      return NextResponse.json(
        { message: 'All field are required' },
        { status: 400 }
      );
    }

    if (pass.length < 5) {
      return NextResponse.json(
        { message: 'Passwords must be at least 5 characters long' },
        { status: 400 }
      );
    }

    connectToDB();

    const duplicate = await User.findOne({ email: email }).lean().exec();

    if (duplicate) {
      return NextResponse.json(
        { message: 'Email already exist' },
        { status: 400 }
      );
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    await User.create(body);
    return NextResponse.json({ message: 'User Created' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
