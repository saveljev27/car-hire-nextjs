import { DBOrderInfo } from '@/types';

export const Order = ({ _id, rentValue, rentDays, createdAt }: DBOrderInfo) => {
  return (
    <div className="border border-gray-200 py-2 px-4 mt-5 rounded-lg">
      <div className="flex justify-between">
        <p>
          Order ID: <span className="font-bold">{_id.toString()}</span>
        </p>
        <p>
          Rent Value: <span className="font-bold">{rentValue}€</span>
        </p>
        <p>
          Rent Days: <span className="font-bold">{rentDays}</span>
        </p>
        <p>
          Created At:
          <span className="font-bold">
            {new Date(createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}
          </span>
        </p>
      </div>
    </div>
  );
};
