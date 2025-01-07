import mongoose, { Document, Schema } from 'mongoose'

export interface IAdmin extends Document {
  name: string
  email: string
  role: string
  permissions: string[]
}
const adminSchema = new mongoose.Schema<IAdmin>(
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
    role: {
      type: String,
      required: true,
      default: 'admin',
    },
    permissions: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
)

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema)
