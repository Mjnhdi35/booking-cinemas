import mongoose, { Document, Schema } from 'mongoose'

export interface ITicket extends Document {
  uid: mongoose.Types.ObjectId
  qrCode?: string
  bookings: mongoose.Types.ObjectId[]
}

const ticketSchema = new mongoose.Schema<ITicket>(
  {
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    qrCode: { type: String },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  },
  { timestamps: true },
)

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema)
