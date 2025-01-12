import mongoose, { Document } from 'mongoose'
import { IUser } from '../users/user.model'
import { IBooking } from '../bookings/booking.model'

export interface ITicket extends Document {
  qrCode: string
  user: mongoose.Types.ObjectId | IUser
  bookings: mongoose.Types.ObjectId[] | IBooking[]
}

const ticketSchema = new mongoose.Schema<ITicket>({
  qrCode: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookings: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  ],
})
const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema)

export { Ticket }
