import mongoose, { Schema, Document } from 'mongoose'

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}
export interface IUser extends Document {
  name: string
  image?: string
  age: number
  password: string
  email: string
  role: Role
  phone: string
  cccd: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    age: {
      type: Number,
      min: 0,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10,11}$/, 'Phone number must be 10-11 digits'],
    },
    cccd: {
      type: String,
      required: [true, 'CCCD is required'],
      unique: true,
      match: [/^\d{12}$/, 'CCCD must be a 12-digit number'],
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  { timestamps: true },
)

const User = mongoose.model<IUser>('User', userSchema)

export { User }
