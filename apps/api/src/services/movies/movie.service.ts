import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { Movie, IMovie } from '../../db/models/movies/movie.model'
import { Genre } from '../../db/models/movies/movie.model'

@Injectable()
export class MovieService {
  constructor(@Inject(Movie) private movieModel: typeof Movie) {}

  // Tạo một phim mới
  async create(body: any) {
    const { title, director, genre, duration, releaseDate } = body
    if (!title || !director || !genre || !duration || !releaseDate) {
      throw new BadRequestException('All fields are required')
    }

    const movie = await this.movieModel.create({
      title,
      director,
      genre,
      duration,
      releaseDate,
      posterUrl: body.posterUrl, // optional field
    })

    return movie
  }

  // Lấy tất cả các phim
  async find() {
    return await this.movieModel.find()
  }

  // Tìm một phim theo ID
  async findOne(id: string) {
    const movie = await this.movieModel.findById(id)
    if (!movie) {
      throw new BadRequestException('Movie not found')
    }
    return movie
  }

  // Cập nhật thông tin phim
  async update(id: string, body: any) {
    const movie = await this.movieModel.findById(id)
    if (!movie) {
      throw new BadRequestException('Movie not found')
    }

    const updatedMovie = await this.movieModel.findByIdAndUpdate(id, body, {
      new: true,
    })

    return updatedMovie
  }

  // Xóa một phim theo ID
  async delete(id: string) {
    const movie = await this.movieModel.findById(id)
    if (!movie) {
      throw new BadRequestException('Movie not found')
    }

    await this.movieModel.deleteOne({ _id: id })
    return 'Movie successfully deleted'
  }
}
