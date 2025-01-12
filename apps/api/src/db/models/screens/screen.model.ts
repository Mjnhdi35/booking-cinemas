import mongoose, { Document } from 'mongoose'
import { ICinema } from '../cinemas/cinema.model'
import { ISeat } from '../seats/seat.model'
import { IShowtime } from '../showtimes/showtime.model'

export enum ScreenType {
  LED = 'LED',
  OLED = 'OLED',
  IMAX = 'IMAX',
  PLASMA = 'Plasma',
  LCD = 'LCD',
  CURVED = 'Màn Hình Cong',
  SCREEN_3D = 'Màn Hình 3D',
}
export enum AudioSystem {
  STEREO = 'Stereo',
  DOLBY_ATMOS = 'Dolby Atmos',
  DOLBY_SURROUND = 'Dolby Surround',
  DTS = 'DTS',
  DTS_X = 'DTS:X',
  THX = 'THX',
  AURA_3D = 'Aura 3D',
}

export interface IScreen extends Document {
  price: number
  screenType: ScreenType
  audioSystem: AudioSystem
  number: number
  cinema: mongoose.Types.ObjectId | ICinema
  seats: mongoose.Types.ObjectId[] | ISeat[]
  showtimes: mongoose.Types.ObjectId[] | IShowtime[]
}

const screenSchema = new mongoose.Schema<IScreen>(
  {
    price: { type: Number, required: [true, 'Price is required'] },
    screenType: {
      type: String,
      enum: Object.values(ScreenType),
      required: true,
    },
    audioSystem: {
      type: String,
      enum: Object.values(AudioSystem),
      required: true,
    },
    number: { type: Number, required: true },
    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
        required: true,
      },
    ],
    showtimes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true,
      },
    ],
  },
  { timestamps: true },
)
const Screen = mongoose.model<IScreen>('Screen', screenSchema)
export { Screen }
