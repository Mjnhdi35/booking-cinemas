import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Cinema } from '../db/models/cinema.model'

@Injectable()
export class CinemaService {
  constructor(@Inject(Cinema) private cinemaModel: typeof Cinema) {}

  async create(body: any) {
    return await this.cinemaModel.create(body)
  }

  async find() {
    return await this.cinemaModel.find()
  }

  async findOne(id: string) {
    const cinema = await this.cinemaModel.findById(id)
    if (!cinema) {
      throw new BadRequestException('Cinema not found')
    }
    return cinema
  }

  async update(id: string, updateCinemaDto: any) {
    const cinema = await this.cinemaModel.findById(id)
    if (!cinema) {
      throw new BadRequestException('Cinema not found')
    }
    await this.cinemaModel.findByIdAndUpdate(id, updateCinemaDto, { new: true })
  }

  async delete(id: string) {
    const cinema = await this.cinemaModel.findById(id)
    if (!cinema) {
      throw new BadRequestException('Cinema not found')
    }
    await this.cinemaModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
