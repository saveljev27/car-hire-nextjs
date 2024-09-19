'use client';

import React from 'react';
import { DBOrderInfo } from '@/types';
import { dateFormatUpdate } from '@/lib';

type Props = DBOrderInfo;

const ProfileOrders: React.FC<Props> = ({
  _id,
  pickupDate,
  pickupTime,
  dropDate,
  dropTime,
  rentPerDay,
  rentValue,
  rentDays,
  carMake,
  carModel,
  createdAt,
}) => {
  return (
    <div>
      <div className="border border-gray-200 py-2 px-4 mt-5 rounded-lg">
        <div>
          <div className="flex justify-between *:text-sm *:text-gray-500 max-[540px]:flex-col">
            <p>Order ID: {_id.toString()}</p>
            <p>
              Created At:
              {new Date(createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}
            </p>
          </div>
          <div className="mt-2 grid grid-cols-3 *:text-sm gap-x-4">
            <p>Pickup Date: {dateFormatUpdate(pickupDate)}</p>
            <p>Drop Date: {dateFormatUpdate(dropDate)}</p>
            <p>Rent Days: {rentDays}</p>
            <p>Pickup Time: {pickupTime}</p>
            <p>Drop Time: {dropTime}</p>
            <p>Rent Value: {rentValue}€</p>
            <p>Rent Per Day: {rentPerDay}€</p>
            <p className="capitalize">Make: {carMake}</p>
            <p className="capitalize">Model: {carModel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOrders;
