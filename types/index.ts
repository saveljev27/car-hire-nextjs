import { Types } from 'mongoose';
import { MouseEventHandler } from 'react';

export interface CustomButtonProps {
  title: string;
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
  city_consumption: number;
  highway_consumption?: number;
  combination_consumption?: number;
  seats: number;
  displacement?: number;
  drive: string;
  fuel_type: string;
  make: string;
  model: string;
  transmission: string;
  year: number;
  image: string;
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
  carMake: string;
  carModel: string;
  userEmail: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface OrderInfo {
  address: string;
  pickupDate: string;
  pickupTime: string;
  dropDate: string;
  dropTime: string;
  rentPerDay: number;
  rentValue: number;
  rentDays: number;
  carMake: string;
  carModel: string;
  userEmail: string;
  name: string;
  phone: string;
  user: Types.ObjectId;
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  orders: Types.ObjectId[];
}

export interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | null;
  placeholder?: string;
  onChange?: any;
  disabled?: boolean;
  required?: boolean;
}
