import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import Admin from '../../db/models/admins/admin.model'
import {
  CreateAdminDto,
  UpdateAdminDto,
} from '../../db/models/admins/dto/admin-dto.model'
import { getSaltRounds } from '../../utils/salt'
import bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
  constructor(@Inject(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password } = createAdminDto
    if (!password) {
      throw new BadRequestException('Mật Khẩu Không Được Để Trống')
    }

    const rounds = getSaltRounds()
    const hashedPassword = await bcrypt.hash(password, rounds)

    const admin = await this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
    })
    return admin
  }

  async find() {
    return await this.adminModel.find()
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id)
    if (!admin) {
      throw new BadRequestException('Người Dùng Không Tồn Tại')
    }
    return admin
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findById(id)
    if (!admin) {
      throw new BadRequestException('Người Dùng Không Tồn Tại')
    }

    if (updateAdminDto.password) {
      const rounds = getSaltRounds()
      updateAdminDto.password = await bcrypt.hash(
        updateAdminDto.password,
        rounds,
      )
    }

    await this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true })
  }

  async delete(id: string) {
    const admin = await this.adminModel.findById(id)
    if (!admin) {
      throw new BadRequestException('Người Dùng Không Tồn Tại')
    }

    await this.adminModel.findByIdAndDelete(id)
    return 'Xóa Thành Công'
  }
}
