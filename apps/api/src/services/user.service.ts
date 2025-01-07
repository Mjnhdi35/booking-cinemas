import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Role, User } from '../db/models/user.model'
import bcrypt from 'bcrypt'
import { getSaltRounds } from '../utils/salt'
import { UpdateUserDto } from '../dto/update-user.dto'
@Injectable()
export class UserService {
  constructor(@Inject(User) private userModel: typeof User) {}

  async create(body: any, currentUser: any) {
    const { password } = body
    if (!password) {
      throw new BadRequestException('full field is required')
    }
    const rounds = getSaltRounds()
    const hashedPassword = await bcrypt.hash(password, rounds)
    const role =
      currentUser &&
      (currentUser.role === Role.ADMIN || currentUser.role === Role.MANAGER)
        ? body.role || currentUser.role
        : Role.USER
    return await this.userModel.create({
      ...body,
      password: hashedPassword,
      role,
    })
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new BadRequestException('khong co user nay')
    }
    if (updateUserDto.password) {
      const rounds = getSaltRounds()
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, rounds)
    }
    await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
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
