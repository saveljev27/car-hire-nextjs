'use client';
import { CustomButton, Input, PageHeader } from '../UI';
import { AllOrderInfo } from '@/types';
import { useFormState } from 'react-dom';
import { updateBooking } from '@/app/actions';
import { Status } from '../UI/Status';
import { useBookings } from '@/shared/hooks/useBookings';

export const BookingEdit = ({ booking }: AllOrderInfo) => {
  const { bookingFields, handleDelete } = useBookings({ booking });

  const [updateState, handleUpdate] = useFormState(updateBooking, null);

  return (
    <form action={handleUpdate}>
      <div className="mt-10">
        <PageHeader>Update Booking: {booking._id.toString()}</PageHeader>
        <Input
          id="_id"
          name="_id"
          label="_id"
          defaultValue={booking._id.toString()}
          type="text"
        />
        <Input
          id="address"
          name="address"
          label="address"
          defaultValue={booking.address}
          type="text"
        />
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(bookingFields).map(([key, value]) => (
            <Input
              id={key}
              name={key}
              key={key}
              label={key}
              defaultValue={value.value as string}
              type={value.type}
            />
          ))}
        </div>
        <Status status={updateState} />
        <div className="mt-4 flex">
          <CustomButton
            title="Update"
            btnType="submit"
            containerStyles="min-w-[300px] m-auto py-[8px] mt-6 rounded bg-green-500"
            textStyles="text-white"
          />
          <CustomButton
            title="Delete"
            containerStyles="min-w-[300px] m-auto py-[8px] mt-6 rounded bg-primary-red"
            textStyles="text-white"
            handleClick={() => handleDelete({ id: booking._id.toString() })}
          />
        </div>
      </div>
    </form>
  );
};
