import mongoose, { Document, Schema } from 'mongoose'

export interface ISeat extends Document {
  row: number
  column: number
  screenId: mongoose.Types.ObjectId
  bookings: mongoose.Types.ObjectId[]
}

const seatSchema = new mongoose.Schema(
  {
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
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  { timestamps: true },
)
seatSchema.index({ screenId: 1, row: 1, column: 1 }, { unique: true })

export const Seat = mongoose.model('Seat', seatSchema)
