import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IMovie extends Document {
  _id: Types.ObjectId
  title: string
  description: string
  actors: string[]
  releaseDate: Date
  posterUrl: string
  featured: boolean
  bookings: Types.Array<Types.ObjectId>
  admin: Types.ObjectId
}

const movieSchema: Schema<IMovie> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    actors: {
      type: [String],
      required: [true, 'Actors are required'],
    },
    releaseDate: {
      type: Date,
      required: [true, 'Release Date is required'],
    },
    posterUrl: {
      type: String,
      required: [true, 'Poster URL is required'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Movie: Model<IMovie> = mongoose.model<IMovie>('Movie', movieSchema)

export default Movie
