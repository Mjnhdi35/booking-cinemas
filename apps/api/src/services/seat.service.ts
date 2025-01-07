import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Seat } from '../db/models/seat.model'

@Injectable()
export class SeatService {
  constructor(@Inject(Seat) private seatModel: typeof Seat) {}

  async create(body: any) {
    return await this.seatModel.create(body)
  }

  async find() {
    return await this.seatModel.find()
  }

  async findOne(id: string) {
    const seat = await this.seatModel.findById(id)
    if (!seat) {
      throw new BadRequestException('Seat not found')
    }
    return seat
  }

  async update(id: string, updateSeatDto: any) {
    const seat = await this.seatModel.findById(id)
    if (!seat) {
      throw new BadRequestException('Seat not found')
    }
    await this.seatModel.findByIdAndUpdate(id, updateSeatDto, { new: true })
  }

  async delete(id: string) {
    const seat = await this.seatModel.findById(id)
    if (!seat) {
      throw new BadRequestException('Seat not found')
    }
    await this.seatModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
