'use client';

import { UserInfo } from '@/types';
import Link from 'next/link';

export const UserList = ({ users }: { users: UserInfo[] }) => {
  return (
    <div>
      {users.map((user) => (
        <Link
          href={`/admin-panel/users/${user._id.toString()}`}
          className="w-full hover:opacity-80"
          key={user._id.toString()}
        >
          <div className="border  border-gray-200 py-2 px-4 mt-5 rounded-lg">
            <p className="text-sm">
              User ID:
              <span className=" text-gray-500">{user._id.toString()}</span>
            </p>
            <div className="md:grid grid-cols-5 gap-4 *:text-sm pt-2 *:text-center">
              <p>
                Name:
                <span className="font-semibold">{user.name}</span>
              </p>
              <p>
                Email:
                <span className="font-semibold">{user.email}</span>
              </p>
              <p>
                Phone:
                <span className="font-semibold ">{user.phone || 'N/A'}</span>
              </p>
              <p>
                Orders quantity:
                <span className="font-semibold ">{user.orders.length}</span>
              </p>
              <p>
                Created At:
                <span className="font-semibold ">
                  {new Date(
                    user.createdAt || user.updatedAt
                  ).toLocaleDateString('en-GB', {
                    timeZone: 'UTC',
                  })}
                </span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
