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
  bookings: mongoose.Types.ObjectId[]
  tickets: mongoose.Types.ObjectId[]
  admin?: mongoose.Types.ObjectId
  manager?: mongoose.Types.ObjectId
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
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    password: {
      type: String,
      require: true,
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: false,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manager',
      required: false,
    },
  },
  { timestamps: true },
)

const User = mongoose.model<IUser>('User', userSchema)

export { User }
