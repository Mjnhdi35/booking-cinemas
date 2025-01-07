import mongoose, { Document, Schema } from 'mongoose'

export interface ICinema extends Document {
  name: string
  screens: mongoose.Types.ObjectId[]
  address?: mongoose.Types.ObjectId
  managers: mongoose.Types.ObjectId[]
}
const cinemaSchema = new mongoose.Schema<ICinema>(
  {
    name: {
      type: String,
      required: true,
    },
    screens: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Screen',
      },
    ],
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    managers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Manager',
      },
    ],
  },
  { timestamps: true },
)

export const Cinema = mongoose.model<ICinema>('Cinema', cinemaSchema)
