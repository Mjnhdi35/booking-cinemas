import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Manager } from '../db/models/manager.model'

@Injectable()
export class ManagerService {
  constructor(@Inject(Manager) private managerModel: typeof Manager) {}

  async create(body: any) {
    return await this.managerModel.create(body)
  }

  async find() {
    return await this.managerModel.find()
  }

  async findOne(id: string) {
    const manager = await this.managerModel.findById(id)
    if (!manager) {
      throw new BadRequestException('Manager not found')
    }
    return manager
  }

  async update(id: string, updateManagerDto: any) {
    const manager = await this.managerModel.findById(id)
    if (!manager) {
      throw new BadRequestException('Manager not found')
    }
    await this.managerModel.findByIdAndUpdate(id, updateManagerDto, {
      new: true,
    })
  }

  async delete(id: string) {
    const manager = await this.managerModel.findById(id)
    if (!manager) {
      throw new BadRequestException('Manager not found')
    }
    await this.managerModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
