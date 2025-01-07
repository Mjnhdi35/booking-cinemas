import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Showtime } from '../db/models/showtime.model'

@Injectable()
export class ShowtimeService {
  constructor(@Inject(Showtime) private showtimeModel: typeof Showtime) {}

  async create(body: any) {
    return await this.showtimeModel.create(body)
  }

  async find() {
    return await this.showtimeModel.find()
  }

  async findOne(id: string) {
    const showtime = await this.showtimeModel.findById(id)
    if (!showtime) {
      throw new BadRequestException('Showtime not found')
    }
    return showtime
  }

  async update(id: string, updateShowtimeDto: any) {
    const showtime = await this.showtimeModel.findById(id)
    if (!showtime) {
      throw new BadRequestException('Showtime not found')
    }
    await this.showtimeModel.findByIdAndUpdate(id, updateShowtimeDto, {
      new: true,
    })
  }

  async delete(id: string) {
    const showtime = await this.showtimeModel.findById(id)
    if (!showtime) {
      throw new BadRequestException('Showtime not found')
    }
    await this.showtimeModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
