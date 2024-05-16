import { Schema, model, models } from 'mongoose';

export type CarProps = {
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
};

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

export const Cars = models.Cars || model<CarProps>('Cars', CarsSchema);
