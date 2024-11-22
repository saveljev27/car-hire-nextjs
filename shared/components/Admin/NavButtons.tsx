import Link from 'next/link';
import { CustomButton } from '../UI';

export const AdminBtn = () => {
  return (
    <Link href="/admin-panel/">
      <CustomButton title="Admin Panel" containerStyles="interface_btn" />
    </Link>
  );
};

export const CarListBtn = () => {
  return (
    <Link href="/admin-panel/all-cars/">
      <CustomButton title="All Cars" containerStyles="interface_btn" />
    </Link>
  );
};

export const OrderListBtn = () => {
  return (
    <Link href="/admin-panel/bookings/">
      <CustomButton title="Orders" containerStyles="interface_btn" />
    </Link>
  );
};

export const AddCarBtn = () => {
  return (
    <Link href="/admin-panel/all-cars/new">
      <CustomButton title="Add car" containerStyles="interface_btn" />
    </Link>
  );
};
