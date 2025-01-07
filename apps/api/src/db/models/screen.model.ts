import mongoose, { Document, Schema } from 'mongoose'

export enum SoundSystemType {
  MONO = 'MONO',
  STEREO = 'STEREO',
  DOLBY_DIGITAL = 'DOLBY_DIGITAL',
  DOLBY_ATMOS = 'DOLBY_ATMOS',
  DTS = 'DTS',
  DTS_X = 'DTS_X',
  SONY_SDDS = 'SONY_SDDS',
  AURO_3D = 'AURO_3D',
  IMAX_ENHANCED = 'IMAX_ENHANCED',
}
export enum ProjectionType {
  STANDARD = 'STANDARD',
  IMAX = 'IMAX',
  DOLBY_CINEMA = 'DOLBY_CINEMA',
  RPX = 'RPX',
  SCREENX = 'SCREENX',
  PLF = 'PLF',
}
export interface IScreen extends Document {
  number: number
  cinemaId: mongoose.Types.ObjectId
  seats: mongoose.Types.ObjectId[]
  showtimes: mongoose.Types.ObjectId[]
  projectionType: ProjectionType
  soundSystemType: SoundSystemType
  price: number
}

const screenSchema = new mongoose.Schema<IScreen>(
  {
    number: {
      type: Number,
      required: true,
    },
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
    },
    seats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Seat',
      },
    ],
    showtimes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Showtime',
      },
    ],
    projectionType: {
      type: String,
      enum: Object.values(ProjectionType),
      default: ProjectionType.STANDARD,
    },
    soundSystemType: {
      type: String,
      enum: Object.values(SoundSystemType),
      default: SoundSystemType.DOLBY_ATMOS,
    },
    price: { type: Number, default: 180 },
  },
  { timestamps: true },
)

export const Screen = mongoose.model<IScreen>('Screen', screenSchema)
