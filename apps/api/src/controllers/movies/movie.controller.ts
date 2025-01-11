import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req } from '../../core/decorators/param.decorator'
import { Request } from '../../core/utils/types'
import { MovieService } from '../../services/movies/movie.service'

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  // Route tạo phim mới
  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    try {
      const movie = await this.movieService.create(body)

      return {
        status: 'success',
        message: 'Movie created successfully',
        data: movie,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  // Route lấy tất cả các phim
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

  // Route lấy phim theo ID
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

  // Route cập nhật thông tin phim
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    try {
      const updatedMovie = await this.movieService.update(id, body)
      return {
        status: 'success',
        message: 'Movie updated successfully',
        data: updatedMovie,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  // Route xóa phim theo ID
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
