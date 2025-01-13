import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param } from '../../core/decorators/param.decorator'
import {
  CreateSeatDto,
  UpdateSeatDto,
} from '../../db/models/seats/dto/seat-dto.model'
import { SeatService } from '../../services/seats/seat.service'

@Controller('seats')
export class SeatController {
  constructor(private seatService: SeatService) {}

  @Post()
  async create(@Body() body: any, createSeatDto: CreateSeatDto) {
    try {
      const seat = await this.seatService.create(body)
      return {
        status: 'success',
        message: 'Seat created successfully',
        data: seat,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const seat = await this.seatService.find()
      return {
        status: 'success',
        data: seat,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const seat = await this.seatService.findOne(id)
      return {
        status: 'success',
        data: seat,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    try {
      await this.seatService.update(id)
      return {
        status: 'success',
        message: 'Seat updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.seatService.delete(id)
      return {
        status: 'success',
        message: 'Movie deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
