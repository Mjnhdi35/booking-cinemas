import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { Manager } from '../../db/models/managers/manager.model'

@Injectable()
export class ManagerService {
  constructor(@Inject(Manager) private managerModel: typeof Manager) {}

  async create(body: any) {
    return await this.managerModel.create(body)
  }
  async find() {
    return await this.managerModel.find().populate('cinema')
  }
  async findOne(id: string) {
    return await this.managerModel.findById(id).populate('cinema')
  }
  async update(id: string) {
    return await this.managerModel.findByIdAndUpdate(id, {
      new: true,
    })
  }
  async delete(id: string) {
    const manager = await this.managerModel.findById(id)
    if (!manager) {
      throw new BadRequestException('Manager not found')
    }
    await this.managerModel.findByIdAndDelete(id)
    return 'Manager successfully deleted'
  }
}
