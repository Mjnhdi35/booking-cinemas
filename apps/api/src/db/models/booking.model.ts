import mongoose, { Document, Schema } from 'mongoose'

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId
  showtimeId: mongoose.Types.ObjectId
  seatId: mongoose.Types.ObjectId
  ticketId: mongoose.Types.ObjectId
  row: number
  column: number
  screenId: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    showtimeId: {
      type: Schema.Types.ObjectId,
      ref: 'Showtime',
      required: true,
    },
    seatId: {
      type: Schema.Types.ObjectId,
      ref: 'Seat',
      required: true,
    },
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    column: {
      type: Number,
      required: true,
    },
    screenId: {
      type: Schema.Types.ObjectId,
      ref: 'Screen',
      required: true,
    },
  },
  { timestamps: true },
)
bookingSchema.index(
  { screenId: 1, row: 1, column: 1, showtimeId: 1 },
  { unique: true },
)

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema)
