import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { CinemaService } from '../services/cinema.service'

@Controller('cinema')
export class CinemaController {
  constructor(private cinemaService: CinemaService) {}

  @Post()
  create(@Body() body: any) {
    return this.cinemaService.create(body)
  }

  @Get()
  find() {
    return this.cinemaService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemaService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCinemaDto: any) {
    return this.cinemaService.update(id, updateCinemaDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cinemaService.delete(id)
  }
}
