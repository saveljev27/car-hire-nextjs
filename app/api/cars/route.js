import { connectToDB } from '@/utils/index'

import Cars from '@/lib/models/Cars'

export const GET = async () => {
  try {
    await connectToDB()

    const cars = await Cars.find({})
    return new Response(JSON.stringify(cars), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}
