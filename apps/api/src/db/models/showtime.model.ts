import mongoose, { Document, Schema } from 'mongoose'

export enum ShowtimeStatus {
  POSTPONED = 'POSTPONED',
  CANCELLED = 'CANCELLED',
}

export interface IShowtime extends Document {
  startTime: Date
  movieId: mongoose.Types.ObjectId
  screenId: mongoose.Types.ObjectId
  status?: ShowtimeStatus
  bookings: mongoose.Types.ObjectId[]
}

const showtimeSchema = new mongoose.Schema<IShowtime>(
  {
    startTime: {
      type: Date,
      required: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    screenId: {
      type: Schema.Types.ObjectId,
      ref: 'Screen',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ShowtimeStatus),
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
showtimeSchema.index({ startTime: 1, screenId: 1 }, { unique: true })
export const Showtime = mongoose.model<IShowtime>('Showtime', showtimeSchema)
