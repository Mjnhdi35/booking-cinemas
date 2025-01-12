import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req } from '../../core/decorators/param.decorator'
import { Request } from '../../core/utils/types'
import {
  CreateScreenDto,
  UpdateScreenDto,
} from '../../db/models/screens/dto/screen-dto.model'
import { ScreenService } from '../../services/screens/screen.service'

@Controller('screens')
export class ScreenController {
  constructor(private screenService: ScreenService) {}

  @Post()
  async create(@Body() body: CreateScreenDto, @Req() req: Request) {
    try {
      const screen = await this.screenService.create(body)
      return {
        status: 'success',
        message: 'Screen created successfully',
        data: screen,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const screens = await this.screenService.find()
      return {
        status: 'success',
        data: screens,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const screen = await this.screenService.findOne(id)
      return {
        status: 'success',
        data: screen,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScreenDto: UpdateScreenDto,
  ) {
    try {
      await this.screenService.update(id, updateScreenDto)
      return {
        status: 'success',
        message: 'Screen updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.screenService.delete(id)
      return {
        status: 'success',
        message: 'Screen deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
