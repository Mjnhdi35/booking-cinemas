import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { Admin } from '../../db/models/admins/admin.model'

@Injectable()
export class AdminService {
  constructor(@Inject(Admin) private adminModel: typeof Admin) {}

  async create(body: any) {
    return await this.adminModel.create(body)
  }
  async find() {
    return await this.adminModel.find()
  }
  async findOne(id: string) {
    return await this.adminModel.findById(id)
  }
  async update(id: string) {
    return await this.adminModel.findByIdAndUpdate(id, {
      new: true,
    })
  }
  async delete(id: string) {
    const admin = await this.adminModel.findById(id)
    if (!admin) {
      throw new BadRequestException('Admin not found')
    }
    await this.adminModel.findByIdAndDelete(id)
    return 'Admin successfully deleted'
  }
}
