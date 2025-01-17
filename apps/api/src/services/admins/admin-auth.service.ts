import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Admin } from '../../db/models/admins/admin.model'
import { Inject } from '../../core/decorators/param.decorator'
import { BadRequestException } from '../../core/base/error.base'

@Injectable()
export class AdminAuthService {
  constructor(@Inject(Admin) private userModel: typeof Admin) {}

  async login(body: any) {
    const { email, password } = body
    const admin = await this.userModel
      .findOne({
        email: body.email,
      })
      .lean()

    if (!admin) {
      throw new BadRequestException('Email hoặc password không đúng!')
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password!)

    if (!isPasswordValid) {
      throw new BadRequestException('Email hoặc password không đúng!')
    }

    const { role, password: userPassword, ...payload } = admin
    const access_token = jsonwebtoken.sign(
      payload,
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: '15m',
      },
    )
    return {
      access_token,
    }
  }
}
