import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req, Res } from '../../core/decorators/param.decorator'
import {
  CreateBookingDto,
  UpdateBookingDto,
} from '../../db/models/bookings/dto/booking-dto.model'
import { Protected } from '../../decorators/protected.decorator'
import { Request, Response } from 'express'
import { BookingService } from '../../services/bookings/booking.service'

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async create(@Body() body: CreateBookingDto, @Req() req: Request) {
    try {
      const booking = await this.bookingService.create(body)
      return {
        status: 'success',
        message: 'Booking đã được tạo thành công',
        data: booking,
      }
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  @Get()
  async find(@Req() req: Request, @Res() res: Response) {
    try {
      const bookings = await this.bookingService.find()
      return {
        status: 'success',
        data: bookings,
      }
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const booking = await this.bookingService.findOne(id)
      return res.status(200).json({
        status: 'success',
        data: booking,
      })
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  @Patch(':id')
  @Protected()
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Res() res: Response,
  ) {
    try {
      await this.bookingService.update(id, updateBookingDto)
      return {
        status: 'success',
        message: 'Booking đã được cập nhật thành công',
      }
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }

  @Delete(':id')
  @Protected()
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.bookingService.delete(id)
      return {
        status: 'success',
        message: 'Booking đã được xóa thành công',
      }
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message,
      }
    }
  }
}
