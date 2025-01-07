import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Screen } from '../db/models/screen.model'

@Injectable()
export class ScreenService {
  constructor(@Inject(Screen) private screenModel: typeof Screen) {}

  async create(body: any) {
    return await this.screenModel.create(body)
  }

  async find() {
    return await this.screenModel.find()
  }

  async findOne(id: string) {
    const screen = await this.screenModel.findById(id)
    if (!screen) {
      throw new BadRequestException('Screen not found')
    }
    return screen
  }

  async update(id: string, updateScreenDto: any) {
    const screen = await this.screenModel.findById(id)
    if (!screen) {
      throw new BadRequestException('Screen not found')
    }
    await this.screenModel.findByIdAndUpdate(id, updateScreenDto, { new: true })
  }

  async delete(id: string) {
    const screen = await this.screenModel.findById(id)
    if (!screen) {
      throw new BadRequestException('Screen not found')
    }
    await this.screenModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
