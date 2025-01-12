import mongoose, { Document } from 'mongoose'
import { IUser } from '../users/user.model'
import { IShowtime } from '../showtimes/showtime.model'
import { IScreen } from '../screens/screen.model'
import { ITicket } from '../tickets/ticket.model'
import { ISeat } from '../seats/seat.model'

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId | IUser
  showtime: mongoose.Types.ObjectId | IShowtime
  screen: mongoose.Types.ObjectId | IScreen
  ticket: mongoose.Types.ObjectId | ITicket
  row: mongoose.Types.ObjectId | ISeat
  column: mongoose.Types.ObjectId | ISeat
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Showtime',
      required: true,
    },
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screen',
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
    row: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat',
      required: true,
    },
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat',
      required: true,
    },
  },
  { timestamps: true },
)
const Booking = mongoose.model<IBooking>('Booking', bookingSchema)
export { Booking }
