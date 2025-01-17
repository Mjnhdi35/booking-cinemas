import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { Admin } from '../../db/models/admins/admin.model'
import { UpdateAdminDto } from '../../db/models/admins/dto/admin-dto.model'
import { Role } from '../../db/models/users/user.model'
import { getSaltRounds } from '../../utils/salt'
import bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
  constructor(@Inject(Admin) private adminModel: typeof Admin) {}

  async create(body: any) {
    const { password } = body
    if (!password) {
      throw new BadRequestException('Password is required')
    }

    const rounds = getSaltRounds()
    const hashedPassword = await bcrypt.hash(password, rounds)
    const role =
      body && (body.role === Role.USER || body.role === Role.MANAGER)
        ? body.role || body.role
        : Role.ADMIN
    return await this.adminModel.create({
      ...body,
      password: hashedPassword,
      role,
    })
  }
  async find() {
    return await this.adminModel.find()
  }
  async findOne(id: string) {
    return await this.adminModel.findById(id)
  }
  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findById(id)

    if (!admin) {
      throw new BadRequestException('User not found')
    }
    if (updateAdminDto.password) {
      const rounds = getSaltRounds()
      updateAdminDto.password = await bcrypt.hash(
        updateAdminDto.password,
        rounds,
      )
    }
    return await this.adminModel.findByIdAndUpdate(id, updateAdminDto, {
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
