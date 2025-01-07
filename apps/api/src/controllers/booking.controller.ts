import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { BookingService } from '../services/booking.service'

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  create(@Body() body: any) {
    return this.bookingService.create(body)
  }

  @Get()
  find() {
    return this.bookingService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: any) {
    return this.bookingService.update(id, updateBookingDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingService.delete(id)
  }
}
