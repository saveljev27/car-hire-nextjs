'use client';

import { DBOrderInfo, OrderProps } from '@/types';
import { CustomButton } from '../UI';
import { dateFormatUpdate } from '@/shared/lib';
import Link from 'next/link';

interface CompleteOrderInfo
  extends OrderProps,
    Pick<DBOrderInfo, '_id' | 'createdAt'> {}

interface AllOrderInfo {
  order: CompleteOrderInfo;
  admin?: boolean;
}

export const BookingInfo = ({ order, admin = false }: AllOrderInfo) => {
  return (
    <form>
      <div className="border border-gray-200 py-2 px-4 mt-5 rounded-lg min-w-[750px]  w-full">
        <div className="flex justify-between *:text-lg *:text-gray-500 max-md:flex-col *:max-md:text-xs ">
          <p>Booking ID: {order._id.toString()}</p>
          <p>
            Created At:
            {new Date(order.createdAt).toLocaleDateString('en-GB', {
              timeZone: 'UTC',
            })}
          </p>
        </div>
        <div className="mt-2 *:text-lg gap-x-4 *:max-md:text-xs max-md:grid-cols-1">
          <div className="grid grid-cols-2">
            <h1 className="font-bold">Customer Details:</h1>
            <div>
              <p>
                <span className="font-semibold mr-1">Name: </span>
                {order.name}
              </p>
              <p>
                <span className="font-semibold mr-1">Email:</span>
                {order.email}
              </p>
              <p>
                <span className="font-semibold mr-1">Phone:</span>
                {order.phone}
              </p>
              <p className="max-w-[275px]">
                <span className="font-semibold mr-1">Address:</span>
                {order.address}
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-2">
            <h1 className="font-bold">Booking Details:</h1>
            <div>
              <p>
                <span className="font-semibold mr-1">Pickup Date:</span>
                {dateFormatUpdate(order.pickupDate)}
              </p>
              <p>
                <span className="font-semibold mr-1">Drop Date:</span>
                {dateFormatUpdate(order.dropDate)}
              </p>
              <p>
                <span className="font-semibold mr-1">Rent Days:</span>
                {order.rentDays}
              </p>
              <p>
                <span className="font-semibold mr-1">Pickup Time:</span>
                {order.pickupTime}
              </p>
              <p>
                <span className="font-semibold mr-1">Drop Time:</span>
                {order.dropTime}
              </p>
              <p className="capitalize">
                <span className="font-semibold mr-1">Make:</span>
                {order.make}
              </p>
              <p className="capitalize">
                <span className="font-semibold mr-1">Model:</span>
                {order.model}
              </p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-2">
            <h1 className="font-bold">Costs:</h1>
            <div>
              <p>
                <span className="font-semibold mr-1">Rent Value:</span>
                {order.rentValue}€
              </p>
              <p>
                <span className="font-semibold mr-1">Rent Per Day:</span>
                {order.rentPerDay}€
              </p>
            </div>
          </div>
        </div>
      </div>
      {admin && (
        <div className="mt-4">
          <Link href={`/admin-panel/bookings/edit/${order._id.toString()}`}>
            <CustomButton
              title="Edit"
              containerStyles="min-w-[300px] m-auto py-[8px] mt-6 rounded bg-green-500"
              textStyles="text-white"
            />
          </Link>
        </div>
      )}
    </form>
  );
};
