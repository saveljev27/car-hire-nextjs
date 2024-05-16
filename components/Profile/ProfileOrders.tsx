'use client';

import { DBOrderInfo } from '@/lib/models/Order';
import { updateDateFormat } from '@/utils';
import { FC } from 'react';

type Props = {
  profileOrders: DBOrderInfo[];
};

const ProfileOrders: FC<Props> = ({ profileOrders }) => {
  return (
    <div>
      <h1 className="profile__title mt-5">My bookings</h1>
      {profileOrders.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul>
          {profileOrders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 py-2 px-4 mt-5 rounded-lg"
            >
              <div key={order._id.toString()}>
                <div className="flex justify-between *:text-sm *:text-gray-500">
                  <p>Order ID: {order._id.toString()}</p>
                  <p>
                    Created At: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-3 *:text-sm gap-x-4">
                  <p>Pickup Date: {updateDateFormat(order.pickupDate)}</p>
                  <p>Drop Date: {updateDateFormat(order.dropDate)}</p>
                  <p>Rent Days: {order.rentDays}</p>
                  <p>Pickup Time: {order.pickupTime}</p>
                  <p>Drop Time: {order.dropTime}</p>
                  <p>Rent Value: {order.rentValue}€</p>
                  <p>Rent Per Day: {order.rentPerDay}€</p>
                  <p className="capitalize">Make: {order.carMake}</p>
                  <p className="capitalize">Model: {order.carModel}</p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileOrders;
