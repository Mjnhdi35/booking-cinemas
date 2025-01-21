import mongoose, { Schema, Document, Types, Model } from 'mongoose'
import { IMovie } from '../movies/movie.model'
import { IUser } from '../users/user.model'

export interface IBooking extends Document {
  movie: Types.ObjectId | IMovie
  showtime: Date
  seatNumber: number[]
  user: Types.ObjectId | IUser
  totalPrice: number
}

const bookingSchema: Schema<IBooking> = new Schema(
  {
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Movie is required'],
    },
    showtime: {
      type: Date,
      required: [true, 'Showtime is required'],
    },
    seatNumber: {
      type: [Number],
      required: [true, 'Seat number is required'],
      validate: {
        validator: (v: number[]) =>
          Array.isArray(v) && v.every((seat) => typeof seat === 'number'),
        message: 'Seat numbers should be an array of numbers',
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
    },
  },
  {
    timestamps: true,
  },
)

const Booking: Model<IBooking> = mongoose.model<IBooking>(
  'Booking',
  bookingSchema,
)

export default Booking
