import { CarProps } from '@/types';
import { Schema, model, models } from 'mongoose';

const CarsSchema = new Schema<CarProps>({
  _id: { type: String },
  class: { type: String },
  city_consumption: { type: Number },
  highway_consumption: { type: Number },
  combination_consumption: { type: Number },
  seats: { type: Number },
  displacement: { type: Number },
  drive: { type: String },
  fuel_type: { type: String },
  make: { type: String },
  model: { type: String },
  transmission: { type: String },
  year: { type: Number },
  image: { type: String },
});

export const Cars = models?.Cars || model<CarProps>('Cars', CarsSchema);
