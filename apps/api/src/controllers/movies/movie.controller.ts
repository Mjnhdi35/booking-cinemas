import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req } from '../../core/decorators/param.decorator'
import { Request } from '../../core/utils/types'
import {
  CreateMovieDto,
  UpdateMovieDto,
} from '../../db/models/movies/dto/movie-dto.model'
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const movie = await this.movieService.findOne(id)
      return {
        status: 'success',
        data: movie,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    try {
      await this.movieService.update(id, updateMovieDto)
      return {
        status: 'success',
        message: 'Movie updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.movieService.delete(id)
      return {
        status: 'success',
        message: 'Movie deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
