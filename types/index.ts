import { Types } from 'mongoose';
import { MouseEventHandler, ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

export interface CustomButtonProps {
  title: string | ReactNode;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: 'button' | 'submit';
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface CarProps {
  _id: string;
  class?: string;
  city_consumption?: number;
  highway_consumption?: number;
  combination_consumption?: number;
  seats: number;
  displacement?: number;
  drive: string;
  fuel_type?: string;
  make: string;
  model: string;
  transmission?: string;
  year: number;
  image: string;
  price: number;
}

export interface DBOrderInfo {
  _id: Types.ObjectId;
  address: string;
  pickupDate: string;
  pickupTime: string;
  dropDate: string;
  dropTime: string;
  rentPerDay: number;
  rentValue: number;
  rentDays: number;
  make: string;
  model: string;
  userEmail: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface OrderProps {
  address: string;
  pickupDate: string;
  pickupTime: string;
  dropDate: string;
  dropTime: string;
  rentValue: number;
  rentDays: number;
  rentPerDay: number;
  make: string;
  model: string;
  email: string;
  name: string;
  phone: string;
  token: string;
}

export interface OrderStatusInfo {
  payment: string;
  status: string;
  orderId: string;
  totalAmount: number;
}

export interface UserInfo {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  orders: Types.ObjectId[];
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InputProps {
  id: string;
  name: string;
  label?: string;
  type?: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  onChange?: any;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface CheckoutProps {
  amount: number;
  orderId: string;
}

export interface SearchParams {
  fuel?: string;
  class?: string;
  transmission?: string;
  search?: string;
  limit?: string;
}

interface CompleteOrderInfo
  extends DBOrderInfo,
    Pick<OrderProps, 'email' | 'name' | 'phone' | 'token'> {}

export interface AllOrderInfo {
  booking: CompleteOrderInfo;
}
