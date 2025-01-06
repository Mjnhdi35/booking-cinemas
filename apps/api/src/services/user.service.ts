import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { User } from '../db/models/user.model'
import bcrypt from 'bcrypt'
@Injectable()
export class UserService {
  constructor(@Inject(User) private userModel: typeof User) {}
  async create(body: any) {
    const { password } = body
    if (!password) {
      throw new BadRequestException('full field is required')
    }
    // console.log('Password before hashing:', password)

    const rounds = process.env.ROUND ? parseInt(process.env.ROUND, 10) : 10
    if (isNaN(rounds) || rounds < 1) {
      throw new BadRequestException('Invalid salt rounds')
    }

    const hashedPassword = await bcrypt.hash(password, rounds)
    // console.log('Hashed password:', hashedPassword)
    return await this.userModel.create({
      ...body,
      password: hashedPassword,
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
