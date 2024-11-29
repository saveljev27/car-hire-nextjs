import {
  userAllProfileBookings,
  userProfileBookings,
} from '@/app/actions/profile';
import { BookingList } from './BookingList';
import { getAllBookings } from '@/app/actions/booking';

export const BookingContent = async ({
  type,
}: {
  type: string;
}): Promise<JSX.Element> => {
  switch (type) {
    case 'PROFILE_BOOKINGS':
      const profileOrders = await userProfileBookings();
      return (
        <BookingList
          orders={profileOrders}
          title={`Your last (${profileOrders.length}) booking/s`}
          showAllBtn
        />
      );
    case 'PROFILE_ALL_BOOKINGS':
      const orders = await userAllProfileBookings();
      return (
        <BookingList orders={orders} title={`My Bookings (${orders.length})`} />
      );
    case 'ADMIN_BOOKINGS':
      const allOrders = await getAllBookings();
      return <BookingList orders={allOrders} isAdminPage />;
    default:
      return <BookingList orders={[]} title={'No Bookings Found'} />;
  }
};
