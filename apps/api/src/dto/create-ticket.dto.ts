import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator'

export class CreateTicketDto {
  @Expose()
  @IsString()
  showtimeId: string

  @Expose()
  @IsString()
  userId: string

  @Expose()
  @IsDate()
  bookingDate: Date

  @Expose()
  @IsOptional()
  @IsNumber()
  price?: number
}
