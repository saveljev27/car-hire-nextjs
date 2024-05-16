import CredentialsProvider from 'next-auth/providers/credentials';
import type { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongoConnect';
import { connectToDB } from '@/utils/index';
import { User } from '@/lib/models/User';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';

export const options: NextAuthOptions = {
  secret: process.env.AUTH_SECRET as string,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          return new Response('Email and password is required!');
        }

        connectToDB();
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (!user) {
          return new Response('Email is doesnt exist');
        }

        if (!passwordOk || !user) {
          return new Response('User not found');
        }

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
};
