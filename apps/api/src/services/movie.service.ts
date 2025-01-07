import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Movie } from '../db/models/movie.model'

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
    const movie = await this.movieModel.findById(id)
    if (!movie) {
      throw new BadRequestException('Movie not found')
    }
    return movie
  }

  async update(id: string, updateMovieDto: any) {
    const movie = await this.movieModel.findById(id)
    if (!movie) {
      throw new BadRequestException('Movie not found')
    }
    await this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true })
  }

  async delete(id: string) {
    const movie = await this.movieModel.findById(id)
    if (!movie) {
      throw new BadRequestException('Movie not found')
    }
    await this.movieModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
