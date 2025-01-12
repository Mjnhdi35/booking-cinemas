import mongoose, { Document } from 'mongoose'
import { IScreen } from '../screens/screen.model'
import { IBooking } from '../bookings/booking.model'

export interface ISeat extends Document {
  row: number
  column: number
  screen: mongoose.Types.ObjectId | IScreen
  bookings: mongoose.Types.ObjectId[] | IBooking[]
}
const seatSchema = new mongoose.Schema<ISeat>(
  {
    row: { type: Number, required: false, default: 5 },
    column: { type: Number, required: false, default: 4 },
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screen',
    },
    bookings: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    ],
  },
  { timestamps: true },
)

const Seat = mongoose.model<ISeat>('Seat', seatSchema)
export { Seat }
