'use client';

import { DBOrderInfo } from '@/types';
import { dateFormatUpdate } from '@/shared/lib';

type Props = DBOrderInfo;

export const AdminOrderPage = ({
  _id,
  pickupDate,
  pickupTime,
  dropDate,
  dropTime,
  rentPerDay,
  rentValue,
  rentDays,
  make,
  model,
  createdAt,
}: Props) => {
  return (
    <div className="border border-gray-200 py-2 px-4 mt-5 rounded-lg">
      <div className="flex justify-between *:text-sm *:text-gray-500 max-md:flex-col *:max-md:text-xs ">
        <p>Order ID: {_id.toString()}</p>
        <p>
          Created At:
          {new Date(createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}
        </p>
      </div>
      <div className="mt-2 grid grid-cols-3 *:text-sm gap-x-4 *:max-md:text-xs max-md:grid-cols-1">
        <p>Pickup Date: {dateFormatUpdate(pickupDate)}</p>
        <p>Drop Date: {dateFormatUpdate(dropDate)}</p>
        <p>Rent Days: {rentDays}</p>
        <p>Pickup Time: {pickupTime}</p>
        <p>Drop Time: {dropTime}</p>
        <p>Rent Value: {rentValue}€</p>
        <p>Rent Per Day: {rentPerDay}€</p>
        <p className="capitalize">Make: {make}</p>
        <p className="capitalize">Model: {model}</p>
      </div>
    </div>
  );
};
