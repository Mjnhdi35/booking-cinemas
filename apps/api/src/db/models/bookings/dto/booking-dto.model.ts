import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { IUser } from '../../users/user.model'
import { IShowtime } from '../../showtimes/showtime.model'
import { IScreen } from '../../screens/screen.model'
import { ITicket } from '../../tickets/ticket.model'
import { ISeat } from '../../seats/seat.model'
import { Types } from 'mongoose'

export class CreateBookingDto {
  @Expose()
  user: Types.ObjectId | IUser

  @Expose()
  showtime: Types.ObjectId | IShowtime

  @Expose()
  screen: Types.ObjectId | IScreen

  @Expose()
  ticket: Types.ObjectId | ITicket

  @Expose()
  row: Types.ObjectId | ISeat

  @Expose()
  column: Types.ObjectId | ISeat
}

export class UpdateBookingDto {
  @Expose()
  @IsOptional()
  @IsString()
  user?: Types.ObjectId | IUser

  @Expose()
  @IsOptional()
  @IsString()
  showtime?: Types.ObjectId | IShowtime

  @Expose()
  @IsOptional()
  @IsString()
  screen?: Types.ObjectId | IScreen

  @Expose()
  @IsOptional()
  @IsString()
  ticket?: Types.ObjectId | ITicket

  @Expose()
  @IsOptional()
  @IsString()
  row?: Types.ObjectId | ISeat

  @Expose()
  @IsOptional()
  @IsString()
  column?: Types.ObjectId | ISeat
}
