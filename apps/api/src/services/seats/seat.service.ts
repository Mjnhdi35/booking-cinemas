import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { Seat } from '../../db/models/seats/seat.model'

@Injectable()
export class SeatService {
  constructor(@Inject(Seat) private seatModel: typeof Seat) {}

  async create(body: any) {
    return await this.seatModel.create(body)
  }
  async find() {
    return await this.seatModel.find().populate('cinema')
  }
  async findOne(id: string) {
    return await this.seatModel.findById(id).populate('cinema')
  }
  async update(id: string) {
    return await this.seatModel.findByIdAndUpdate(id, {
      new: true,
    })
  }
  async delete(id: string) {
    const seat = await this.seatModel.findById(id)
    if (!seat) {
      throw new BadRequestException('Seat not found')
    }
    await this.seatModel.findByIdAndDelete(id)
    return 'Seat successfully deleted'
  }
}
