import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Booking } from '../db/models/booking.model'

@Injectable()
export class BookingService {
  constructor(@Inject(Booking) private bookingModel: typeof Booking) {}

  async create(body: any) {
    return await this.bookingModel.create(body)
  }

  async find() {
    return await this.bookingModel.find()
  }

  async findOne(id: string) {
    const booking = await this.bookingModel.findById(id)
    if (!booking) {
      throw new BadRequestException('Booking not found')
    }
    return booking
  }

  async update(id: string, updateBookingDto: any) {
    const booking = await this.bookingModel.findById(id)
    if (!booking) {
      throw new BadRequestException('Booking not found')
    }
    await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, {
      new: true,
    })
  }

  async delete(id: string) {
    const booking = await this.bookingModel.findById(id)
    if (!booking) {
      throw new BadRequestException('Booking not found')
    }
    await this.bookingModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
