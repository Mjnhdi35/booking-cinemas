import mongoose, { Document } from 'mongoose'
import { IScreen } from '../screens/screen.model'
import { IMovie } from '../movies/movie.model'
import { IBooking } from '../bookings/booking.model'

export enum ShowtimeStatus {
  SCHEDULED = 'Đã Lên Lịch',
  IN_PROGRESS = 'Đang Chiếu',
  COMPLETED = 'Đã Kết Thúc',
  CANCELLED = 'Bị Hủy',
  POSTPONED = 'Hoãn Lại',
}
export interface IShowtime extends Document {
  startTime: Date
  status: ShowtimeStatus
  screen: mongoose.Types.ObjectId | IScreen
  movie: mongoose.Types.ObjectId | IMovie
  bookings: mongoose.Types.ObjectId[] | IBooking[]
  startTimeString?: string
  formattedStartTime?: string
}
const showtimeSchema = new mongoose.Schema<IShowtime>(
  {
    startTime: { type: Date, required: false, default: Date.now() },
    status: {
      type: String,
      enum: Object.values(ShowtimeStatus),
      required: true,
    },
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screen',
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
      },
    ],
  },
  { timestamps: true },
)
showtimeSchema.pre('save', function (next) {
  if (this.startTime) {
    const vietnamOffset = 7 * 60
    const utcDate = new Date(this.startTime)
    const vietnamTime = new Date(utcDate.getTime() + vietnamOffset * 60000)
    this.startTime = vietnamTime
  }
  next()
})

showtimeSchema.virtual('formattedStartTime').get(function (this: IShowtime) {
  const date = this.startTime
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
})
const Showtime = mongoose.model<IShowtime>('Showtime', showtimeSchema)

export { Showtime }
