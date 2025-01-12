import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { UpdateMovieDto } from '../../db/models/movies/dto/movie-dto.model'
import { Movie } from '../../db/models/movies/movie.model'

@Injectable()
export class MovieService {
  constructor(@Inject(Movie) private movieModel: typeof Movie) {}

  async create(body: any) {
    return await this.movieModel.create(body)
  }
  async find() {
    return await this.movieModel.find()
  }
  async findOne(id: string) {
    return await this.movieModel.findById(id)
  }
  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return await this.movieModel.findByIdAndUpdate(id, updateMovieDto, {
      new: true,
    })
  }
  async delete(id: string) {
    const movie = await this.movieModel.findById(id)
    if (!movie) {
      throw new BadRequestException('Movie not found')
    }
    await this.movieModel.deleteOne({ id })
    return 'Movie successfully deleted'
  }
}
