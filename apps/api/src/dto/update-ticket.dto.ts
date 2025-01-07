import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator'

export class UpdateTicketDto {
  @Expose()
  @IsOptional()
  @IsString()
  showtimeId?: string

  @Expose()
  @IsOptional()
  @IsString()
  userId?: string

  @Expose()
  @IsOptional()
  @IsDate()
  bookingDate?: Date

  @Expose()
  @IsOptional()
  @IsNumber()
  price?: number
}
