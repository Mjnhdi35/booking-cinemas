import { Expose } from 'class-transformer'
import { IsString, IsOptional } from 'class-validator'
import { IUser } from '../../users/user.model'
import { IBooking } from '../../bookings/booking.model'
import { Types } from 'mongoose'

export class CreateTicketDto {
  @Expose()
  @IsString()
  qrCode: string

  @Expose()
  @IsOptional()
  user: Types.ObjectId | IUser

  @Expose()
  @IsOptional()
  bookings: Types.ObjectId[] | IBooking[]
}

export class UpdateTicketDto {
  @Expose()
  @IsOptional()
  @IsString()
  qrCode?: string

  @Expose()
  @IsOptional()
  user?: Types.ObjectId | IUser

  @Expose()
  @IsOptional()
  bookings?: Types.ObjectId[] | IBooking[]
}
