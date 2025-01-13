import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { Showtime } from '../../db/models/showtimes/showtime.model'

@Injectable()
export class ShowtimeService {
  constructor(@Inject(Showtime) private showtimeModel: typeof Showtime) {}

  async create(body: any) {
    return await this.showtimeModel.create(body)
  }
  async find() {
    return await this.showtimeModel.find().populate('cinema')
  }
  async findOne(id: string) {
    return await this.showtimeModel.findById(id).populate('cinema')
  }
  async update(id: string) {
    return await this.showtimeModel.findByIdAndUpdate(id, {
      new: true,
    })
  }
  async delete(id: string) {
    const showtime = await this.showtimeModel.findById(id)
    if (!showtime) {
      throw new BadRequestException('Showtime not found')
    }
    await this.showtimeModel.findByIdAndDelete(id)
    return 'Showtime successfully deleted'
  }
}
