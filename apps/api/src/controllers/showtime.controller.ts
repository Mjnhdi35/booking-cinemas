import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { ShowtimeService } from '../services/showtime.service'

@Controller('showtime')
export class ShowtimeController {
  constructor(private showtimeService: ShowtimeService) {}

  @Post()
  create(@Body() body: any) {
    return this.showtimeService.create(body)
  }

  @Get()
  find() {
    return this.showtimeService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showtimeService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowtimeDto: any) {
    return this.showtimeService.update(id, updateShowtimeDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.showtimeService.delete(id)
  }
}
