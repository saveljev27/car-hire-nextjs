import { deleteBooking } from '@/app/actions/booking';
import { AllOrderInfo } from '@/types';
import { useRouter } from 'next/navigation';

export const useBookings = ({ booking }: AllOrderInfo) => {
  const router = useRouter();
  const bookingFields = {
    name: { value: booking.name, type: 'text' },
    phone: { value: booking.phone, type: 'number' },
    email: { value: booking.email, type: 'email' },
    pickupDate: { value: booking.pickupDate, type: 'date' },
    pickupTime: { value: booking.pickupTime, type: 'time' },
    dropDate: { value: booking.dropDate, type: 'date' },
    dropTime: { value: booking.dropTime, type: 'time' },
    rentPerDay: { value: booking.rentPerDay, type: 'number' },
    rentValue: { value: booking.rentValue, type: 'number' },
    rentDays: { value: booking.rentDays, type: 'number' },
    make: { value: booking.make, type: 'text' },
    model: { value: booking.model, type: 'text' },
  };

  const handleDelete = async ({ id }: { id: string }) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this booking?'
    );
    if (!confirm) return;
    const response = await deleteBooking(id);
    if (response.success) {
      router.replace('/admin-panel/bookings');
    }
  };

  return { bookingFields, handleDelete };
};
