import mongoose, { Document } from 'mongoose'
import { IScreen } from '../screens/screen.model'
import { IAddress } from '../address/address.model'
import { IManager } from '../managers/manager.model'

export interface ICinema extends Document {
  name: string
  screen: mongoose.Types.ObjectId[] | IScreen[]
  address: mongoose.Types.ObjectId | IAddress
  manager: mongoose.Types.ObjectId[] | IManager[]
}
const cinemaSchema = new mongoose.Schema<ICinema>(
  {
    name: { type: String, required: true },
    screen: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    ],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
    },
    manager: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
    ],
  },
  { timestamps: true },
)
const Cinema = mongoose.model<ICinema>('Cinema', cinemaSchema)

export { Cinema }
