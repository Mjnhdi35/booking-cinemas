import mongoose, { Document } from 'mongoose'
import { Role } from '../users/user.model'

export interface IAdmin extends Document {
  name: string
  role: Role
  password: string
  email: string
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
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
  },
  { timestamps: true },
)
const Admin = mongoose.model<IAdmin>('Admin', adminSchema)
export { Admin }
