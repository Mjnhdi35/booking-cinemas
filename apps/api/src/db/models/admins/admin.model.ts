import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IAdmin extends Document {
  email: string
  password: string
  addedMovies: Types.ObjectId[]
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    addedMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin
