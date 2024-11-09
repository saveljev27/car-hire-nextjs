import { UserInfo } from '@/types';
import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema<UserInfo>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    phone: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models?.User || model<UserInfo>('User', UserSchema);
