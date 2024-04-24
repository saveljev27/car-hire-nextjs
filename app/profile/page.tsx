'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const Profile = () => {
  const session = useSession()
  const { status, data } = session
  console.log(data)

  if (status === 'loading') {
    return 'Loading...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  return (
    <div className="flex-1 pt-36 pb-36 padding-x">
      <h1 className="profile__title">Profile</h1>
    </div>
  )
}

export default Profile
