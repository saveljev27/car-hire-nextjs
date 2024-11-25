import { OrderStatusInfo } from '@/types';
import { model, models, Schema } from 'mongoose';

const OrderStatusSchema = new Schema<OrderStatusInfo>(
  {
    payment: { type: String },
    status: { type: String },
    orderId: { type: String },
    totalAmount: { type: Number },
  },
  { timestamps: true }
);

export const OrderStatus =
  models?.OrderStatus ||
  model<OrderStatusInfo>('OrderStatus', OrderStatusSchema);
