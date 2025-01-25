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

  // Create a new booking
  async create(createBookingDto: CreateBookingDto) {
    const { showtime, seatNumber, user, movie } = createBookingDto

    // Validate input data
    if (!movie) throw new BadRequestException('Phim không được để trống')
    if (!user) throw new BadRequestException('Người dùng không được để trống')
    if (!seatNumber || seatNumber.length === 0)
      throw new BadRequestException('Số ghế không hợp lệ')

    let showtimeObj: Date | null = null
    if (showtime) {
      showtimeObj = new Date(showtime)
      if (isNaN(showtimeObj.getTime()))
        throw new BadRequestException('Ngày chiếu không hợp lệ')
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // Verify Movie exists
      const movieRecord = await this.movieModel.findById(movie).session(session)
      if (!movieRecord) throw new BadRequestException('Phim không tồn tại')

      // Verify User exists
      const userRecord = await this.userModel.findById(user).session(session)
      if (!userRecord) throw new BadRequestException('Người dùng không tồn tại')

      // Create new booking
      const booking = await this.bookingModel.create(
        [
          {
            ...createBookingDto,
            showtime: showtimeObj,
            user: new Types.ObjectId(user),
            movie: new Types.ObjectId(movie),
            seatNumber,
          },
        ],
        { session },
      )

      // Update user with the new booking
      userRecord.bookings.push(booking[0]._id)
      await userRecord.save({ session })

      await session.commitTransaction()
      return booking[0]
    } catch (error: any) {
      await session.abortTransaction()
      throw new BadRequestException(`Không thể tạo đặt vé: ${error.message}`)
    } finally {
      session.endSession()
    }
  }

  // Get all bookings
  async find() {
    try {
      return await this.bookingModel.find().populate('movie user').exec()
    } catch (error) {
      throw new BadRequestException('Không thể lấy danh sách booking')
    }
  }

  // Get a single booking by ID
  async findOne(id: string) {
    try {
      const booking = await this.bookingModel
        .findById(id)
        .populate('movie user')
        .exec()

      if (!booking) throw new BadRequestException('Booking không tồn tại')
      return booking
    } catch (error) {
      throw new BadRequestException('Không thể tìm thấy booking')
    }
  }

  // Update a booking by ID
  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const booking = await this.bookingModel.findById(id).session(session)
      if (!booking) throw new BadRequestException('Booking không tồn tại')

      if (updateBookingDto.movie) {
        const movieExists = await this.movieModel
          .findById(updateBookingDto.movie)
          .session(session)
        if (!movieExists) throw new BadRequestException('Phim không tồn tại')
      }

      if (updateBookingDto.user) {
        const userExists = await this.userModel
          .findById(updateBookingDto.user)
          .session(session)
        if (!userExists)
          throw new BadRequestException('Người dùng không tồn tại')
      }

      const updatedBooking = await this.bookingModel
        .findByIdAndUpdate(id, updateBookingDto, { new: true, session })
        .populate('movie user')
        .exec()

      await session.commitTransaction()
      return updatedBooking
    } catch (error: any) {
      await session.abortTransaction()
      throw new BadRequestException(
        `Không thể cập nhật booking: ${error.message}`,
      )
    } finally {
      session.endSession()
    }
  }

  // Delete a booking by ID
  async delete(id: string) {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const booking = await this.bookingModel
        .findById(id)
        .populate('user movie')
        .session(session)
      if (!booking) throw new BadRequestException('Booking không tồn tại')

      // Remove booking from user's list
      const userRecord = await this.userModel
        .findById(booking.user)
        .session(session)
      if (userRecord) {
        userRecord.bookings.pull(booking._id)
        await userRecord.save({ session })
      }

      await booking.deleteOne({ session })
      await session.commitTransaction()

      return 'Xóa booking thành công'
    } catch (error: any) {
      await session.abortTransaction()
      throw new BadRequestException(`Không thể xóa booking: ${error.message}`)
    } finally {
      session.endSession()
    }
  }
}
