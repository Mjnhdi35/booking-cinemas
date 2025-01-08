import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { UpdateMovieDto } from '../dto/update-movie.dto'
import { MovieService } from '../services/movie.service'

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  create(@Body() body: any) {
    return this.movieService.create(body)
  }

  @Get()
  find() {
    return this.movieService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id)
  }
}
