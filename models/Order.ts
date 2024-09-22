import { OrderInfo } from '@/types';
import { model, models, Schema } from 'mongoose';

const OrderSchema = new Schema<OrderInfo>(
  {
    address: { type: String },
    pickupDate: { type: String },
    pickupTime: { type: String },
    dropDate: { type: String },
    dropTime: { type: String },
    rentValue: { type: Number },
    rentDays: { type: Number },
    rentPerDay: { type: Number },
    make: { type: String },
    model: { type: String },
    email: { type: String },
    name: { type: String },
    phone: { type: String },
    token: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const Order = models?.Order || model<OrderInfo>('Order', OrderSchema);
