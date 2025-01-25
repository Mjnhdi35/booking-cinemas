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
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)
userSchema.virtual('bookingsDetail', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'user',
})
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)

export default User
