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
  CreateCinemaDto,
  UpdateCinemaDto,
} from '../../db/models/cinemas/dto/cinema-dto'
import { CinemaService } from '../../services/cinemas/cinema.service'

@Controller('cinemas')
export class CinemaController {
  constructor(private cinemaService: CinemaService) {}

  @Post()
  async create(@Body() body: CreateCinemaDto, @Req() req: Request) {
    try {
      const cinema = await this.cinemaService.create(body)
      return {
        status: 'success',
        message: 'cinema created successfully',
        data: cinema,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const cinema = await this.cinemaService.find()
      return {
        status: 'success',
        data: cinema,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const cinema = await this.cinemaService.findOne(id)
      return {
        status: 'success',
        data: cinema,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCinemaDto: UpdateCinemaDto,
  ) {
    try {
      await this.cinemaService.update(id, updateCinemaDto)
      return {
        status: 'success',
        message: 'Cinema updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.cinemaService.delete(id)
      return {
        status: 'success',
        message: 'Movie deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
