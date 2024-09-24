import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { User } from '@/shared/models/User';
import { connectToDB } from '@/shared/lib';

export const options: NextAuthOptions = {
  secret: process.env.AUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            name: profile?.name?.replace(' ', '').toLowerCase(),
          });
        }

        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error);
        return false;
      }
    },
  },
};
