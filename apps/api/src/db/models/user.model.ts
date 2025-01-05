import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)

export { User }
