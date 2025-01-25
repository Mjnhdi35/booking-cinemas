import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import {
  CreateUserDto,
  UpdateUserDto,
} from '../../db/models/users/dto/user-dto.model'
import User from '../../db/models/users/user.model'
import { getSaltRounds } from '../../utils/salt'
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@Inject(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto
    if (!email) {
      throw new BadRequestException('Email không được để trống')
    }
    if (!password) {
      throw new BadRequestException('Mật Khẩu Không Được Để Trống')
    }
    const existingUser = await this.userModel.findOne({ email })
    if (existingUser) {
      throw new BadRequestException('Người dùng với email này đã tồn tại')
    }

    const rounds = getSaltRounds()
    const hashedPassword = await bcrypt.hash(password, rounds)

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      bookings: [],
    })
    return user
  }

  async find() {
    return await this.userModel.find().populate('bookings')
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new BadRequestException('Người Dùng Không Tồn Tại')
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new BadRequestException('Người Dùng Không Tồn Tại')
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
      throw new BadRequestException('Người Dùng Không Tồn Tại')
    }

    await this.userModel.findByIdAndDelete(id)
    return 'Xóa Thành Công'
  }

  async addBookingToUser(userId: string, bookingId: string) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new BadRequestException('Người Dùng Không Tồn Tại')
    }

    user.bookings.push(bookingId as any)
    await user.save()
  }

  async removeBookingFromUser(userId: string, bookingId: string) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new BadRequestException('Người Dùng Không Tồn Tại')
    }

    user.bookings.pull(bookingId as any)
    await user.save()
  }
}
