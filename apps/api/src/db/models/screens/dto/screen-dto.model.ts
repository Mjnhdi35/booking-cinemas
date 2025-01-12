import { Expose } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { AudioSystem, ScreenType } from '../screen.model'
import { ObjectId } from 'mongoose'
import { ISeat } from '../../seats/seat.model'
import { IShowtime } from '../../showtimes/showtime.model'
import { ICinema } from '../../cinemas/cinema.model'

export class CreateScreenDto {
  @Expose()
  @IsNumber()
  price: number

  @Expose()
  @IsEnum(ScreenType)
  screenType: ScreenType

  @Expose()
  @IsEnum(AudioSystem)
  audioSystem: AudioSystem

  @Expose()
  @IsNumber()
  number: number

  @Expose()
  @IsOptional()
  @IsArray()
  seats: ObjectId[] | ISeat[]

  @Expose()
  @IsOptional()
  @IsArray()
  showtimes: ObjectId[] | IShowtime[]

  @Expose()
  @IsOptional()
  cinema: ObjectId | ICinema
}

export class UpdateScreenDto {
  @Expose()
  @IsNumber()
  price: number

  @Expose()
  @IsEnum(ScreenType)
  screenType: ScreenType

  @Expose()
  @IsEnum(AudioSystem)
  audioSystem: AudioSystem

  @Expose()
  @IsNumber()
  number: number

  @Expose()
  @IsOptional()
  @IsArray()
  seats: ObjectId[] | ISeat[]

  @Expose()
  @IsOptional()
  @IsArray()
  showtimes: ObjectId[] | IShowtime[]

  @Expose()
  @IsOptional()
  cinema: ObjectId | ICinema
}
