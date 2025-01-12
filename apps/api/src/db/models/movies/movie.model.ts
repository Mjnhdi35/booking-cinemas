import mongoose from 'mongoose'
import { IShowtime } from '../showtimes/showtime.model'

export enum Genre {
  ACTION = 'Hành Động',
  ROMANCE = 'Tình Cảm',
  COMEDY = 'Hài',
  HORROR = 'Kinh Dị',
  SCI_FI = 'Viễn Tưởng',
  DRAMA = 'Tâm Lý',
  WAR = 'Chiến Tranh',
  ADVENTURE = 'Phiêu Lưu',
  MYTHOLOGY = 'Thần Thoại',
  CRIME = 'Hình Sự',
  PERIOD_DRAMA = 'Cổ Trang',
  ANIMATION = 'Hoạt Hình',
  FAMILY = 'Gia Đình',
  DOCUMENTARY = 'Tài Liệu',
}

export interface IMovie extends Document {
  title: string
  director: string
  genre: Genre
  duration: number
  releaseDate: Date
  posterUrl?: string
  releaseDateString?: string
  showtimes: mongoose.Types.ObjectId[] | IShowtime[]
}

const movieSchema = new mongoose.Schema<IMovie>(
  {
    title: { type: String, required: [true, 'Movie is required'] },
    director: { type: String, required: [true, 'Director is required'] },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: false,
    },
    releaseDate: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    posterUrl: { type: String, required: false },
    releaseDateString: { type: String, required: false },
    showtimes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    ],
  },
  { timestamps: true, toJSON: { getters: true } },
)
movieSchema.pre('save', function (next) {
  if (this.releaseDateString) {
    const [day, month, year] = this.releaseDateString.split('/')
    const date = new Date(+year, +month - 1, +day)
    this.releaseDate = date
  }
  next()
})
movieSchema.virtual('formattedReleaseDate').get(function (this: IMovie) {
  const date = this.releaseDate
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})

const Movie = mongoose.model<IMovie>('Movie', movieSchema)

export { Movie }
