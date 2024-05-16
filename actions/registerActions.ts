'use server';

import bcrypt from 'bcrypt';
import { User } from '@/lib/models/User';
import { connectToDB } from '@/utils';
import { NextResponse } from 'next/server';

export async function registerProfile(formData: FormData) {
  await connectToDB();

  const formEntries = Object.fromEntries(formData.entries());
  const { name, email, password } = formEntries as {
    [key: string]: string | File;
  };

  // Проверка типов данных и преобразование в строку
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof name !== 'string'
  ) {
    return NextResponse.json({ message: 'Invalid form data' }, { status: 400 });
  }

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: 'All fields are required' },
      { status: 400 }
    );
  }

  const duplicate = await User.findOne({ email: email }).lean().exec();

  if (duplicate) {
    return NextResponse.json(
      { message: 'Email already exists' },
      { status: 400 }
    );
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Создание нового пользователя
  await User.create({ name, password: hashedPassword, email });

  return NextResponse.json({ message: 'User Created' }, { status: 201 });
}
