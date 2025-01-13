import { Expose } from 'class-transformer'
import { IsDateString, IsEnum, IsOptional } from 'class-validator'
import { ShowtimeStatus } from '../showtime.model'
import { IScreen } from '../../screens/screen.model'
import { IMovie } from '../../movies/movie.model'
import { IBooking } from '../../bookings/booking.model'
import { Types } from 'mongoose'

export class CreateShowtimeDto {
  @Expose()
  @IsDateString()
  startTime: string

  @Expose()
  @IsEnum(ShowtimeStatus)
  status: ShowtimeStatus

  @Expose()
  screen: Types.ObjectId | IScreen

  @Expose()
  movie: Types.ObjectId | IMovie

  @Expose()
  @IsOptional()
  bookings?: Types.ObjectId[] | IBooking[]
}

export class UpdateShowtimeDto {
  @Expose()
  @IsOptional()
  @IsDateString()
  startTime?: string

  @Expose()
  @IsOptional()
  @IsEnum(ShowtimeStatus)
  status?: ShowtimeStatus

  @Expose()
  @IsOptional()
  screen?: Types.ObjectId | IScreen

  @Expose()
  @IsOptional()
  movie?: Types.ObjectId | IMovie

  @Expose()
  @IsOptional()
  bookings?: Types.ObjectId[] | IBooking[]
}
