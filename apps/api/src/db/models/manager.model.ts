import mongoose, { Document, Schema } from 'mongoose'

export interface IManager extends Document {
  name: string
  email: string
  cinemaId?: mongoose.Types.ObjectId
  role: string
}
const managerSchema = new mongoose.Schema<IManager>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cinemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'manager',
    },
  },
  { timestamps: true },
)

export const Manager = mongoose.model<IManager>('Manager', managerSchema)
