import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param } from '../../core/decorators/param.decorator'
import {
  CreateShowtimeDto,
  UpdateShowtimeDto,
} from '../../db/models/showtimes/dto/showtime-dto.model'
import { ShowtimeService } from '../../services/showtimes/showtime.service'

@Controller('showtimes')
export class ShowtimeController {
  constructor(private showtimeService: ShowtimeService) {}

  @Post()
  async create(@Body() body: any, createShowtimeDto: CreateShowtimeDto) {
    try {
      const showtime = await this.showtimeService.create(body)
      return {
        status: 'success',
        message: 'Showtime created successfully',
        data: showtime,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const showtime = await this.showtimeService.find()
      return {
        status: 'success',
        data: showtime,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const showtime = await this.showtimeService.findOne(id)
      return {
        status: 'success',
        data: showtime,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShowtimeDto: UpdateShowtimeDto,
  ) {
    try {
      await this.showtimeService.update(id)
      return {
        status: 'success',
        message: 'Showtime updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.showtimeService.delete(id)
      return {
        status: 'success',
        message: 'Movie deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
