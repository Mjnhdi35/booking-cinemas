import { Expose } from 'class-transformer'
import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator'

export class CreateShowtimeDto {
  @Expose()
  @IsString()
  movieId: string

  @Expose()
  @IsString()
  screenId: string

  @Expose()
  @IsDate()
  showtime: Date

  @Expose()
  @IsOptional()
  @IsNumber()
  ticketPrice?: number
}
