import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Injectable } from '../../core/decorators/injectable.decorator'

import { Inject } from '../../core/decorators/param.decorator'
import { BadRequestException } from '../../core/base/error.base'
import { Manager } from '../../db/models/managers/manager.model'

@Injectable()
export class ManagerAuthService {
  constructor(@Inject(Manager) private managerModel: typeof Manager) {}

  async login(body: any) {
    const { email, password } = body
    const manager = await this.managerModel
      .findOne({
        email: body.email,
      })
      .lean()

    if (!manager) {
      throw new BadRequestException('Email hoặc password không đúng!')
    }

    const isPasswordValid = await bcrypt.compare(password, manager.password!)

    if (!isPasswordValid) {
      throw new BadRequestException('Email hoặc password không đúng!')
    }

    const { role, password: userPassword, ...payload } = manager
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
