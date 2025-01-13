import mongoose, { Document } from 'mongoose'
import { ICinema } from '../cinemas/cinema.model'
import { Role } from '../users/user.model'

export interface IManager extends Document {
  name: string
  role: Role
  password: string
  cinemas?: mongoose.Types.ObjectId[] | ICinema[]
}

const managerSchema = new mongoose.Schema<IManager>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    cinemas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cinema',
        required: false,
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.MANAGER,
    },
  },
  { timestamps: true },
)
const Manager = mongoose.model<IManager>('Manager', managerSchema)
export { Manager }
