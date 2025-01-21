import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  bookings: Types.Array<Types.ObjectId>
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  {
    timestamps: true,
  },
)

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default User
