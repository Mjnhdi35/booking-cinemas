import mongoose, { Document, Schema } from 'mongoose'

export interface IAddress extends Document {
  cinemaId?: mongoose.Types.ObjectId
  address: string
  lat: number
  lng: number
}

const addressSchema = new mongoose.Schema<IAddress>(
  {
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      unique: true,
    },
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
