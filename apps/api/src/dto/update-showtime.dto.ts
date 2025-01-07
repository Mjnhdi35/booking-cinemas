import { Expose } from 'class-transformer'
import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator'

export class UpdateShowtimeDto {
  @Expose()
  @IsOptional()
  @IsString()
  movieId?: string

  @Expose()
  @IsOptional()
  @IsString()
  screenId?: string

  @Expose()
  @IsOptional()
  @IsDate()
  showtime?: Date

  @Expose()
  @IsOptional()
  @IsNumber()
  ticketPrice?: number
}
