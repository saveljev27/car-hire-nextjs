import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'
import clientPromise from '@/lib/mongoConnect'
import { connectToDB } from '@/utils/index'
import { User } from '@/lib/models/User'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

export const options = {
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        try {
          const email = credentials?.email
          const password = credentials?.password

          connectToDB()
          const user = await User.findOne({ email })
          const passwordOk = user && bcrypt.compareSync(password, user.password)

          if (passwordOk) {
            return user
          }
        } catch (error) {
          console.log(error)
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}
