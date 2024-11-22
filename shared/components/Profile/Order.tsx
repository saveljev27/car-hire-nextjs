import { DBOrderInfo } from '@/types';

export const Order = ({
  _id,
  rentValue,
  rentDays,
  createdAt,
  make,
}: DBOrderInfo) => {
  return (
    <div className="border border-gray-200 py-2 px-4 mt-5 rounded-lg">
      <div className="flex justify-around items-center gap-10">
        <p className="text-xs flex justify-center">
          ID: <span className="font-bold">{_id.toString()}</span>
        </p>
        <p className="text-xs flex justify-center">
          Make:
          <span className="font-bold capitalize">{make}</span>
        </p>
        <p className="text-xs flex justify-center">
          Rent Value: <span className="font-bold">{rentValue}€</span>
        </p>
        <p className="text-xs flex justify-center">
          Rent Days: <span className="font-bold">{rentDays}</span>
        </p>
        <p className="text-xs flex justify-center">
          Created At:
          <span className="font-bold">
            {new Date(createdAt).toLocaleDateString('en-GB', {
              timeZone: 'UTC',
            })}
          </span>
        </p>
      </div>
    </div>
  );
};
