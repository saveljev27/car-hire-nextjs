import { DBOrderInfo } from '@/types';

export const Order = ({
  _id,
  rentValue,
  rentDays,
  createdAt,
  make,
  model,
}: DBOrderInfo) => {
  return (
    <div className="border border-gray-200 py-2 px-4 mt-5 rounded-lg">
      <p className="text-sm">
        Booking ID:
        <span className="ml-1 text-gray-500">{_id.toString()}</span>
      </p>
      <div className="grid grid-cols-5 gap-4 *:text-sm pt-2 *:text-center">
        <p>
          Make: <span className="font-semibold ml-1 capitalize">{make}</span>
        </p>
        <p>
          Model: <span className="font-semibold ml-1 capitalize">{model}</span>
        </p>
        <p>
          Rent Value: <span className="font-semibold ml-1">{rentValue}€</span>
        </p>
        <p>
          Rent Days: <span className="font-semibold ml-1">{rentDays}</span>
        </p>
        <p>
          Created At:
          <span className="font-semibold ml-1">
            {new Date(createdAt).toLocaleDateString('en-GB', {
              timeZone: 'UTC',
            })}
          </span>
        </p>
      </div>
    </div>
  );
};
