import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param } from '../../core/decorators/param.decorator'
import {
  CreateAdminDto,
  UpdateAdminDto,
} from '../../db/models/admins/dto/admin-dto.model'
import { AdminService } from '../../services/admins/admin.service'

@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  async create(@Body() body: any, createAdminDto: CreateAdminDto) {
    try {
      const admin = await this.adminService.create(body)
      return {
        status: 'success',
        message: 'Admin created successfully',
        data: admin,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const admin = await this.adminService.find()
      return {
        status: 'success',
        data: admin,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
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
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    try {
      await this.adminService.update(id)
      return {
        status: 'success',
        message: 'Admin updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.adminService.delete(id)
      return {
        status: 'success',
        message: 'Movie deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
