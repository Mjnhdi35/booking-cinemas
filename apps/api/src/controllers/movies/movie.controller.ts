import { Controller } from '../../core/decorators/controller.decorator'
import { Get, Post } from '../../core/decorators/method.decorator'
import { Body, Req } from '../../core/decorators/param.decorator'
import { Request } from '../../core/utils/types'
import { CreateMovieDto } from '../../db/models/movies/dto/movie-dto.model'
import { MovieService } from '../../services/movies/movie.service'

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  async create(@Body() body: CreateMovieDto, @Req() req: Request) {
    try {
      const movie = await this.movieService.create(body)
      return {
        status: 'success',
        message: 'movie created successfully',
        data: movie,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const movies = await this.movieService.find()
      return {
        status: 'success',
        data: movies,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  //   async findOne() {}
  //   async update() {}
  //   async delete() {}
}
