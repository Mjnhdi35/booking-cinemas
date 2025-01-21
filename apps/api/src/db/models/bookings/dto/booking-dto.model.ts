import { Expose } from 'class-transformer'
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator'
import { Types } from 'mongoose'

export class CreateBookingDto {
  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  movie: Types.ObjectId

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  showtime: Date

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  seatNumber: number[]

  @Expose()
  @IsMongoId()
  @IsNotEmpty()
  user: Types.ObjectId

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number
}

export class UpdateBookingDto {
  @Expose()
  @IsMongoId()
  @IsOptional()
  movie?: Types.ObjectId

  @Expose()
  @IsDate()
  @IsOptional()
  @IsDateString()
  showtime?: Date

  @Expose()
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  seatNumber?: number[]

  @Expose()
  @IsMongoId()
  @IsOptional()
  user?: Types.ObjectId

  @Expose()
  @IsNumber()
  @IsOptional()
  totalPrice?: number
}
