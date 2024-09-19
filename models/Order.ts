import { OrderInfo } from '@/types';
import { model, models, Schema } from 'mongoose';

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
    name: { type: String },
    phone: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const Order = models?.Order || model<OrderInfo>('Order', OrderSchema);
