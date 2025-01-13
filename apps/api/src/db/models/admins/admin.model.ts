import mongoose, { Document } from 'mongoose'
import { Role } from '../users/user.model'

export interface IAdmin extends Document {
  name: string
  role: Role
  password: string
}

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.ADMIN,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { timestamps: true },
)
const Admin = mongoose.model<IAdmin>('Admin', adminSchema)
export { Admin }
