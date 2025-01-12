import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { IUser } from '../../users/user.model'
import { IShowtime } from '../../showtimes/showtime.model'
import { IScreen } from '../../screens/screen.model'
import { ITicket } from '../../tickets/ticket.model'
import { ISeat } from '../../seats/seat.model'

export class CreateBookingDto {
  @Expose()
  user: string | IUser

  @Expose()
  showtime: string | IShowtime

  @Expose()
  screen: string | IScreen

  @Expose()
  ticket: string | ITicket

  @Expose()
  row: string | ISeat

  @Expose()
  column: string | ISeat
}

export class UpdateBookingDto {
  @Expose()
  @IsOptional()
  @IsString()
  user?: string | IUser

  @Expose()
  @IsOptional()
  @IsString()
  showtime?: string | IShowtime

  @Expose()
  @IsOptional()
  @IsString()
  screen?: string | IScreen

  @Expose()
  @IsOptional()
  @IsString()
  ticket?: string | ITicket

  @Expose()
  @IsOptional()
  @IsString()
  row?: string | ISeat

  @Expose()
  @IsOptional()
  @IsString()
  column?: string | ISeat
}
