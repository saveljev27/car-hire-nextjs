import { model, models, Schema, Types } from 'mongoose';

export type DBOrderInfo = {
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
};

export type OrderInfo = {
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
};

const OrderSchema = new Schema<OrderInfo>(
  {
    address: { type: String },
    pickupDate: { type: String },
    pickupTime: { type: String },
    dropDate: { type: String },
    dropTime: { type: String },
    rentPerDay: { type: Number },
    rentValue: { type: Number },
    rentDays: { type: Number },
    carMake: { type: String },
    carModel: { type: String },
    userEmail: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const Order = models?.Order || model<OrderInfo>('Order', OrderSchema);
