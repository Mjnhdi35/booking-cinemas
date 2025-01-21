import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req, Res } from '../../core/decorators/param.decorator'
import {
  CreateAdminDto,
  UpdateAdminDto,
} from '../../db/models/admins/dto/admin-dto.model'
import { Protected } from '../../decorators/protected.decorator'
import { AdminService } from '../../services/admins/admin.service'
import { Request, Response } from 'express'

@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  async create(@Body() body: CreateAdminDto, @Req() req: Request) {
    try {
      const admin = await this.adminService.create(body)

      return {
        status: 'success',
        message: 'Đã Tạo Thành Công',
        data: admin,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  @Protected()
  async find(@Req() req: Request, @Res() res: Response) {
    try {
      const admins = await this.adminService.find()
      return {
        status: 'success',
        data: admins,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  @Protected()
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const admin = await this.adminService.findOne(id)
      return {
        status: 'success',
        data: admin,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Patch(':id')
  @Protected()
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    try {
      await this.adminService.update(id, updateAdminDto)
      return {
        status: 'success',
        message: 'Đã Cập Nhập Thành Công',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  @Protected()
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.adminService.delete(id)
      return {
        status: 'success',
        message: 'Đã Xóa Thành Công',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
