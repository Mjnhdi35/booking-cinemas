import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req, Res } from '../../core/decorators/param.decorator'
import {
  CreateUserDto,
  UpdateUserDto,
} from '../../db/models/users/dto/user-dto.model'
import { Protected } from '../../decorators/protected.decorator'

import { Request, Response } from 'express'
import { UserService } from '../../services/users/user.service'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto, @Req() req: Request) {
    try {
      const user = await this.userService.create(body)

      return {
        status: 'success',
        message: 'Người Dùng Đã Được Tạo Thành Công',
        data: user,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  // @Protected()
  async find(@Req() req: Request, @Res() res: Response) {
    try {
      const users = await this.userService.find()
      return {
        status: 'success',
        data: users,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(id)
      return {
        status: 'success',
        data: user,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Patch(':id')
  @Protected()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(id, updateUserDto)
      return {
        status: 'success',
        message: 'Người Dùng Đã Cập Nhập Thành Công',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  @Protected()
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.userService.delete(id)
      return {
        status: 'success',
        message: 'Người Dùng Đã Xóa Thành Công',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
