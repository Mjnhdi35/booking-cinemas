import mongoose, { Document, Schema } from 'mongoose'

export interface IAddress extends Document {
  address: string
  lat: number
  lng: number
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
  },
  { timestamps: true },
)

export const Address = mongoose.model<IAddress>('Address', addressSchema)
