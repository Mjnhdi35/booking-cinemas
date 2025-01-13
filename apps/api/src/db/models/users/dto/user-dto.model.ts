import { Expose } from 'class-transformer'
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'
import { Role } from '../user.model'
import mongoose, { ObjectId, Types } from 'mongoose'
import { ITicket } from '../../tickets/ticket.model'
import { IBooking } from '../../bookings/booking.model'

export class CreateUserDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsNumber()
  age: number

  @Expose()
  @IsString()
  @IsEmail()
  email: string

  @Expose()
  @IsString()
  password: string

  @Expose()
  @IsString()
  phone: string

  @Expose()
  @IsString()
  cccd: string

  @Expose()
  @IsString()
  @IsOptional()
  image?: string

  @Expose()
  @IsEnum(Role)
  @IsOptional()
  role?: Role

  @Expose()
  @IsArray()
  @IsOptional()
  tickets?: Types.ObjectId[] | ITicket[]

  @Expose()
  @IsArray()
  @IsOptional()
  bookings?: Types.ObjectId[] | IBooking[]
}

export class UpdateUserDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string

  @Expose()
  @IsNumber()
  @IsOptional()
  age?: number

  @Expose()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string

  @Expose()
  @IsString()
  @IsOptional()
  password?: string

  @Expose()
  @IsString()
  @IsOptional()
  phone?: string

  @Expose()
  @IsString()
  @IsOptional()
  cccd?: string

  @Expose()
  @IsString()
  @IsOptional()
  image?: string

  @Expose()
  @IsEnum(Role)
  @IsOptional()
  role?: Role

  @Expose()
  @IsArray()
  @IsOptional()
  tickets?: Types.ObjectId[] | ITicket[]

  @Expose()
  @IsArray()
  @IsOptional()
  bookings?: Types.ObjectId[] | IBooking[]
}
