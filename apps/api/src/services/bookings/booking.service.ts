import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { BadRequestException } from '../../core/base/error.base'
import Bookings from '../../db/models/bookings/booking.model'
import Movie from '../../db/models/movies/movie.model'
import User from '../../db/models/users/user.model'
import {
  CreateBookingDto,
  UpdateBookingDto,
} from '../../db/models/bookings/dto/booking-dto.model'
import mongoose, { Types } from 'mongoose'

@Injectable()
export class BookingService {
  constructor(
    @Inject(Bookings) private bookingModel: typeof Bookings,
    @Inject(Movie) private movieModel: typeof Movie,
    @Inject(User) private userModel: typeof User,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { showtime, seatNumber, totalPrice, user, movie } = createBookingDto

    if (!movie) {
      throw new BadRequestException('Phim Không Được Để Trống')
    }
    if (!user) {
      throw new BadRequestException('Người Dùng Không Được Để Trống')
    }
    if (!seatNumber || seatNumber.length === 0) {
      throw new BadRequestException('Số ghế không hợp lệ')
    }
    if (!totalPrice) {
      throw new BadRequestException('Giá vé không được để trống')
    }

    let showtimeObj: Date | null = null
    if (showtime) {
      showtimeObj = new Date(showtime)

      if (isNaN(showtimeObj.getTime())) {
        throw new BadRequestException('Ngày chiếu không hợp lệ')
      }
    }

    try {
      const booking = await this.bookingModel.create({
        ...createBookingDto,
        showtime: showtimeObj,
        user: new Types.ObjectId(user),
        movie: new Types.ObjectId(movie),
        seatNumber,
        totalPrice,
      })

      return booking
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error
      throw new BadRequestException('Không thể tạo đặt vé: ' + error.message)
    }
  }
  async find() {
    try {
      return await this.bookingModel.find().populate('movie user').exec()
    } catch (error) {
      throw new BadRequestException('Không thể lấy danh sách booking')
    }
  }

  async findOne(id: string) {
    let booking
    try {
      booking = await this.bookingModel
        .findById(id)
        .populate('movie user')
        .exec()
    } catch (err) {
      throw new BadRequestException('Không thể tìm thấy booking')
    }

    if (!booking) {
      throw new BadRequestException('Booking không tồn tại')
    }

    return booking
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingModel.findById(id)
    if (!booking) {
      throw new BadRequestException('Không thể tìm thấy booking')
    }

    if (updateBookingDto.movie) {
      const movieExists = await this.movieModel.findById(updateBookingDto.movie)
      if (!movieExists) {
        throw new BadRequestException('Movie không tồn tại')
      }
    }

    if (updateBookingDto.user) {
      const userExists = await this.userModel.findById(updateBookingDto.user)
      if (!userExists) {
        throw new BadRequestException('User không tồn tại')
      }
    }

    try {
      const updatedBooking = await this.bookingModel.findByIdAndUpdate(
        id,
        updateBookingDto,
        {
          new: true,
        },
      )
      return updatedBooking
    } catch (err) {
      throw new BadRequestException('Không thể cập nhật booking')
    }
  }

  async delete(id: string) {
    const booking = await this.bookingModel.findById(id).populate('user movie')
    if (!booking) {
      throw new BadRequestException('Không thể xóa booking')
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      if (booking.user instanceof User && booking.movie instanceof Movie) {
        booking.user.bookings.pull(booking._id)
        booking.movie.bookings.pull(booking._id)
        await booking.user.save({ session })
        await booking.movie.save({ session })
      } else {
        throw new BadRequestException('User hoặc Movie không hợp lệ')
      }

      await booking.deleteOne({ session })
      await session.commitTransaction()
    } catch (err) {
      await session.abortTransaction()
      throw new BadRequestException('Không thể xóa booking')
    } finally {
      session.endSession()
    }

    return 'Xóa booking thành công'
  }
}
