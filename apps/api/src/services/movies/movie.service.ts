import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'

import { Types } from 'mongoose'
import Movie from '../../db/models/movies/movie.model'
import {
  CreateMovieDto,
  UpdateMovieDto,
} from '../../db/models/movies/dto/movie-dto.model'

@Injectable()
export class MovieService {
  constructor(@Inject(Movie) private movieModel: typeof Movie) {}

  async create(createMovieDto: CreateMovieDto) {
    const { title, releaseDate } = createMovieDto

    if (!title) {
      throw new BadRequestException('Tiêu Đề Phim Không Được Để Trống')
    }
    let releaseDateObj: Date | null = null
    if (releaseDate) {
      releaseDateObj = new Date(releaseDate)
      if (isNaN(releaseDateObj.getTime())) {
        throw new BadRequestException('Ngày phát hành không hợp lệ')
      }
    }
    try {
      const movie = await this.movieModel.create({
        ...createMovieDto,
        releaseDate: releaseDateObj,
        admin: new Types.ObjectId(createMovieDto.admin),
        bookings: createMovieDto.bookings.map((id) => new Types.ObjectId(id)),
      })

      return movie
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error
      throw new BadRequestException('Không Thể Tạo Phim: ' + error.message)
    }
  }

  async find() {
    try {
      const movies = await this.movieModel
        .find()
        .populate('admin', 'username email')
        .populate('bookings')
        .exec()
      return movies
    } catch (error) {
      throw new BadRequestException('Không Thể Lấy Danh Sách Phim')
    }
  }

  async findOne(id: string) {
    try {
      const movie = await this.movieModel
        .findById(new Types.ObjectId(id))
        .populate('admin', 'username email')
        .populate('bookings')
        .exec()

      if (!movie) {
        throw new BadRequestException('Phim Không Tồn Tại')
      }

      return movie
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new BadRequestException('Không Thể Lấy Thông Tin Phim')
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      const movie = await this.findOne(id)
      if (!movie) {
        throw new BadRequestException('Phim Không Tồn Tại')
      }

      const updatedMovie = await this.movieModel
        .findByIdAndUpdate(
          new Types.ObjectId(id),
          {
            ...updateMovieDto,
            admin: new Types.ObjectId(updateMovieDto.admin),
            bookings: updateMovieDto?.bookings?.map(
              (id) => new Types.ObjectId(id),
            ),
          },
          { new: true },
        )
        .populate('admin', 'username email')
        .populate('bookings')
        .exec()

      return updatedMovie
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new BadRequestException('Không Thể Cập Nhật Phim')
    }
  }

  async delete(id: string) {
    try {
      const movie = await this.findOne(id)
      if (!movie) {
        throw new BadRequestException('Phim Không Tồn Tại')
      }

      await this.movieModel.findByIdAndDelete(new Types.ObjectId(id))
      return 'Xóa Thành Công'
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new BadRequestException('Không Thể Xóa Phim')
    }
  }

  async findFeatured() {
    try {
      return await this.movieModel
        .find({ featured: true })
        .populate('admin', 'username email')
        .populate('bookings')
        .exec()
    } catch (error) {
      throw new BadRequestException('Không Thể Lấy Danh Sách Phim Nổi Bật')
    }
  }

  async findByTitle(title: string) {
    try {
      return await this.movieModel
        .find({ title: new RegExp(title, 'i') })
        .populate('admin', 'username email')
        .populate('bookings')
        .exec()
    } catch (error) {
      throw new BadRequestException('Không Thể Tìm Kiếm Phim')
    }
  }
}
