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
      <div className="flex justify-around items-center gap-10 *:text-xs *:justify-center">
        <p>
          ID: <span className="font-bold ml-1">{_id.toString()}</span>
        </p>
        <p>
          Make:
          <span className="font-bold ml-1 capitalize">{make}</span>
        </p>
        <p>
          Rent Value: <span className="font-bold ml-1">{rentValue}€</span>
        </p>
        <p>
          Rent Days: <span className="font-bold ml-1">{rentDays}</span>
        </p>
        <p>
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
