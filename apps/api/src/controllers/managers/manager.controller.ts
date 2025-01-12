import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req } from '../../core/decorators/param.decorator'
import { Request } from '../../core/utils/types'
import { ManagerService } from '../../services/managers/manager.service'

@Controller('managers')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    try {
      const manager = await this.managerService.create(body)
      return {
        status: 'success',
        message: 'Manager created successfully',
        data: manager,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const managers = await this.managerService.find()
      return {
        status: 'success',
        data: managers,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const manager = await this.managerService.findOne(id)
      return {
        status: 'success',
        data: manager,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string) {
    try {
      await this.managerService.update(id)
      return {
        status: 'success',
        message: 'Manager updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.managerService.delete(id)
      return {
        status: 'success',
        message: 'Manager deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
