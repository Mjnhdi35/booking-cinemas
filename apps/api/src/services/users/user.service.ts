import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { UpdateUserDto } from '../../db/models/users/dto/user-dto.model'
import { Role, User } from '../../db/models/users/user.model'
import { getSaltRounds } from '../../utils/salt'
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@Inject(User) private userModel: typeof User) {}

  // Create a new user
  async create(body: any) {
    const { password } = body
    if (!password) {
      throw new BadRequestException('Password is required')
    }

    const rounds = getSaltRounds()
    const hashedPassword = await bcrypt.hash(password, rounds)

    // Set the role based on the current user's role (admin/manager) or default to user
    const role =
      body && (body.role === Role.ADMIN || body.role === Role.MANAGER)
        ? body.role || body.role
        : Role.USER

    return await this.userModel.create({
      ...body,
      password: hashedPassword,
      role,
    })
  }

  // Get all users
  async find() {
    return await this.userModel.find()
  }

  // Find a single user by ID
  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new BadRequestException('User not found')
    }
    return user
  }

  // Update a user's information
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new BadRequestException('User not found')
    }

    // Hash the password if it's being updated
    if (updateUserDto.password) {
      const rounds = getSaltRounds()
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, rounds)
    }

    await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
  }

  // Delete a user by ID
  async delete(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new BadRequestException('User not found')
    }

    await this.userModel.findByIdAndDelete(id)
    return 'User successfully deleted'
  }
}
