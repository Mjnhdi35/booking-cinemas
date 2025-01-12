import { Expose } from 'class-transformer'
import { IsString, IsOptional } from 'class-validator'
import { IUser } from '../../users/user.model'
import { IBooking } from '../../bookings/booking.model'

export class CreateTicketDto {
  @Expose()
  @IsString()
  qrCode: string

  @Expose()
  @IsOptional()
  user: string | IUser

  @Expose()
  @IsOptional()
  bookings: string[] | IBooking[]
}

export class UpdateTicketDto {
  @Expose()
  @IsOptional()
  @IsString()
  qrCode?: string

  @Expose()
  @IsOptional()
  user?: string | IUser

  @Expose()
  @IsOptional()
  bookings?: string[] | IBooking[]
}
