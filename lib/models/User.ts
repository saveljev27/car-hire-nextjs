import { model, models, Schema, Types } from 'mongoose';

export type UserInfo = {
  name: string;
  email: string;
  password: string;
  image: string;
  phone: string;
  orders: Types.ObjectId[];
};

const UserSchema = new Schema<UserInfo>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    phone: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
);

export const User = models?.User || model<UserInfo>('User', UserSchema);
