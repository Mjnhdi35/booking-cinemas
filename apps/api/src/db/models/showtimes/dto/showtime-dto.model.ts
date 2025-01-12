import { Expose } from 'class-transformer'
import { IsDateString, IsEnum, IsOptional } from 'class-validator'
import { ShowtimeStatus } from '../showtime.model'
import { IScreen } from '../../screens/screen.model'
import { IMovie } from '../../movies/movie.model'
import { IBooking } from '../../bookings/booking.model'

export class CreateShowtimeDto {
  @Expose()
  @IsDateString()
  startTime: string

  @Expose()
  @IsEnum(ShowtimeStatus)
  status: ShowtimeStatus

  @Expose()
  screen: string | IScreen

  @Expose()
  movie: string | IMovie

  @Expose()
  @IsOptional()
  bookings?: string[] | IBooking[]
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
  screen?: string | IScreen

  @Expose()
  @IsOptional()
  movie?: string | IMovie

  @Expose()
  @IsOptional()
  bookings?: string[] | IBooking[]
}
