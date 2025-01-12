import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../db/models/users/user.model'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { BadRequestException } from '../core/base/error.base'

@Injectable()
export class AuthService {
  constructor(@Inject(User) private userModel: typeof User) {}

  async login(body: any) {
    const { email, password } = body
    const user = await this.userModel
      .findOne({
        email: body.email,
      })
      .lean()

    if (!user) {
      throw new BadRequestException('Email hoặc password không đúng!')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!)

    if (!isPasswordValid) {
      throw new BadRequestException('Email hoặc password không đúng!')
    }

    const { password: userPassword, ...payload } = user
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
