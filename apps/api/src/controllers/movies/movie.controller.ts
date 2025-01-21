import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req, Res } from '../../core/decorators/param.decorator'
import {
  CreateMovieDto,
  UpdateMovieDto,
} from '../../db/models/movies/dto/movie-dto.model'
import { Protected } from '../../decorators/protected.decorator'
import { Request, Response } from 'express'
import { MovieService } from '../../services/movies/movie.service'

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  @Protected()
  async create(@Body() createMovieDto: CreateMovieDto, @Req() req: Request) {
    try {
      const movie = await this.movieService.create(createMovieDto)

      return {
        status: 'success',
        message: 'Phim Đã Được Tạo Thành Công',
        data: movie,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find(@Req() req: Request, @Res() res: Response) {
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

  @Get('featured')
  async findFeatured(@Req() req: Request, @Res() res: Response) {
    try {
      const movies = await this.movieService.findFeatured()
      return {
        status: 'success',
        data: movies,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get('search')
  async searchByTitle(@Req() req: Request) {
    try {
      const { title } = req.query
      if (typeof title !== 'string') {
        throw new Error('Tiêu đề tìm kiếm không hợp lệ')
      }

      const movies = await this.movieService.findByTitle(title)
      return {
        status: 'success',
        data: movies,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
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
  @Protected()
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    try {
      const updatedMovie = await this.movieService.update(id, updateMovieDto)
      return {
        status: 'success',
        message: 'Phim Đã Được Cập Nhật Thành Công',
        data: updatedMovie,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  @Protected()
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.movieService.delete(id)
      return {
        status: 'success',
        message: 'Phim Đã Được Xóa Thành Công',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
