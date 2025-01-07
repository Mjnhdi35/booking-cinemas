import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { SeatService } from '../services/seat.service'

@Controller('seat')
export class SeatController {
  constructor(private seatService: SeatService) {}

  @Post()
  create(@Body() body: any) {
    return this.seatService.create(body)
  }

  @Get()
  find() {
    return this.seatService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: any) {
    return this.seatService.update(id, updateSeatDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.seatService.delete(id)
  }
}
