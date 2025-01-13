import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param } from '../../core/decorators/param.decorator'
import {
  CreateBookingDto,
  UpdateBookingDto,
} from '../../db/models/bookings/dto/booking-dto.model'
import { BookingService } from '../../services/bookings/booking.service'

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async create(@Body() body: any, createBookingDto: CreateBookingDto) {
    try {
      const booking = await this.bookingService.create(body)
      return {
        status: 'success',
        message: 'Booking created successfully',
        data: booking,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const booking = await this.bookingService.find()
      return {
        status: 'success',
        data: booking,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const booking = await this.bookingService.findOne(id)
      return {
        status: 'success',
        data: booking,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    try {
      await this.bookingService.update(id)
      return {
        status: 'success',
        message: 'Booking updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.bookingService.delete(id)
      return {
        status: 'success',
        message: 'Movie deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
