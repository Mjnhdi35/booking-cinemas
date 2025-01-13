import { Expose } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { ObjectId, Types } from 'mongoose'
import { IBooking } from '../../bookings/booking.model'
import { IScreen } from '../../screens/screen.model'

export class CreateSeatDto {
  @Expose()
  @IsNumber()
  row: number

  @Expose()
  @IsNumber()
  column: number

  @Expose()
  @IsArray()
  @IsOptional()
  bookings: Types.ObjectId[] | IBooking[]

  @Expose()
  screen: Types.ObjectId | IScreen
}

export class UpdateSeatDto {
  @Expose()
  @IsNumber()
  row: number

  @Expose()
  @IsNumber()
  column: number

  @Expose()
  @IsArray()
  @IsOptional()
  bookings: Types.ObjectId[] | IBooking[]

  @Expose()
  screen: Types.ObjectId | IScreen
}
