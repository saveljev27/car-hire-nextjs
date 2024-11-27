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
    <div className="shadow-lg border border-gray-200 py-2 px-4 mt-5 rounded-lg hover:border">
      <p className="text-sm">
        Booking ID:
        <span className=" text-gray-500">{_id.toString()}</span>
      </p>
      <div className="md:grid grid-cols-5 gap-4 *:text-sm pt-2 *:text-center">
        <p>
          Make: <span className="font-semibold  capitalize">{make}</span>
        </p>
        <p>
          Model: <span className="font-semibold  capitalize">{model}</span>
        </p>
        <p>
          Rent Value: <span className="font-semibold ">{rentValue}€</span>
        </p>
        <p>
          Rent Days: <span className="font-semibold ">{rentDays}</span>
        </p>
        <p>
          Created At:
          <span className="font-semibold ">
            {new Date(createdAt).toLocaleDateString('en-GB', {
              timeZone: 'UTC',
            })}
          </span>
        </p>
      </div>
    </div>
  );
};
