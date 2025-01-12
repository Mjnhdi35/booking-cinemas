import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { UpdateScreenDto } from '../../db/models/screens/dto/screen-dto.model'
import { Screen } from '../../db/models/screens/screen.model'

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
    return await this.screenModel.findById(id)
  }
  async update(id: string, updateScreenDto: UpdateScreenDto) {
    return await this.screenModel.findByIdAndUpdate(id, updateScreenDto, {
      new: true,
    })
  }
  async delete(id: string) {
    const screen = await this.screenModel.findById(id)
    if (!Screen) {
      throw new BadRequestException('Screen not found')
    }
    await this.screenModel.findByIdAndDelete(id)
    return 'Screen successfully deleted'
  }
}
