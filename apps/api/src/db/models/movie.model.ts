import mongoose, { Document, Schema } from 'mongoose'

export enum Genre {
  ACTION = 'ACTION',
  ADVENTURE = 'ADVENTURE',
  ANIMATION = 'ANIMATION',
  COMEDY = 'COMEDY',
  CRIME = 'CRIME',
  DOCUMENTARY = 'DOCUMENTARY',
  DRAMA = 'DRAMA',
  FAMILY = 'FAMILY',
  FANTASY = 'FANTASY',
  FILM_NOIR = 'FILM_NOIR',
  HISTORY = 'HISTORY',
  HORROR = 'HORROR',
  MUSIC = 'MUSIC',
  MYSTERY = 'MYSTERY',
  ROMANCE = 'ROMANCE',
  SCI_FI = 'SCI_FI',
  SHORT = 'SHORT',
  SPORT = 'SPORT',
  THRILLER = 'THRILLER',
  WAR = 'WAR',
  WESTERN = 'WESTERN',
}

export interface IMovie extends Document {
  title: string
  director: string
  genre: Genre
  duration: number
  releaseDate: Date
  posterUrl?: string
  showtimes: mongoose.Types.ObjectId[]
}

const movieSchema = new mongoose.Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    posterUrl: {
      type: String,
    },
    showtimes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Showtime',
      },
    ],
  },
  { timestamps: true },
)

export const Movie = mongoose.model<IMovie>('Movie', movieSchema)
