import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { User } from '../db/models/user.model'

@Injectable()
export class UserService {
  constructor(@Inject(User) private userModel: typeof User) {}
  async create(body: any) {
    return await this.userModel.create(body)
  }
  async find() {
    return await this.userModel.find()
  }
  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new BadRequestException('khong co user nay')
    }
    return user
  }

  async delete(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new BadRequestException('khong co user nay')
    }
    await this.userModel.deleteOne({
      _id: id,
    })
    return 'thanh cong'
  }

  // onInit() {
  //     console.log('user service init');
  // }
}
