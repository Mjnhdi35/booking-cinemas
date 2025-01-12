import mongoose, { Document, Schema } from 'mongoose'
import { ICinema } from '../cinemas/cinema.model'

export interface IAddress extends Document {
  address: string
  lat: number
  lng: number
  cinema: mongoose.Types.ObjectId | ICinema
}

const addressSchema = new mongoose.Schema<IAddress>(
  {
    address: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
    },
  },
  { timestamps: true },
)

export const Address = mongoose.model<IAddress>('Address', addressSchema)
