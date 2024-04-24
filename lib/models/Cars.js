import { Schema, model, models } from 'mongoose'

const CarsSchema = new Schema({
  _id: {
    type: String,
  },
  city_mpg: {
    type: Number,
  },
  class: {
    type: String,
  },
  combination_mpg: {
    type: Number,
  },
  cylinders: {
    type: Number,
  },
  displacement: {
    type: Number,
  },
  drive: {
    type: String,
  },
  fuel_type: {
    type: String,
  },
  highway_mpg: {
    type: Number,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  transmission: {
    type: String,
  },
  year: {
    type: Number,
  },
})

const Cars = models.Cars || model('Cars', CarsSchema)

export default Cars
