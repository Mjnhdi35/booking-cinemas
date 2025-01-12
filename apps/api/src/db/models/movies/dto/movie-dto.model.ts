import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { Genre } from '../movie.model'
import { Expose } from 'class-transformer'
import { IShowtime } from '../../showtimes/showtime.model'
import { ObjectId } from 'mongoose'

export class CreateMovieDto {
  @Expose()
  @IsString()
  title: string

  @Expose()
  @IsString()
  director: string

  @Expose()
  @IsEnum(Genre)
  genre: Genre

  @Expose()
  @IsNumber()
  duration: number

  @Expose()
  @IsOptional()
  @IsDateString()
  releaseDateString?: string

  @Expose()
  @IsOptional()
  @IsString()
  posterUrl?: string

  @Expose()
  @IsArray()
  @IsOptional()
  showtimes: ObjectId[] | IShowtime[]
}

export class UpdateMovieDto {
  @Expose()
  @IsString()
  title: string

  @Expose()
  @IsString()
  director: string

  @Expose()
  @IsEnum(Genre)
  genre: Genre

  @Expose()
  @IsNumber()
  duration: number

  @Expose()
  @IsOptional()
  @IsDateString()
  releaseDateString?: string

  @Expose()
  @IsOptional()
  @IsString()
  posterUrl?: string

  @Expose()
  @IsArray()
  @IsOptional()
  showtimes: ObjectId[] | IShowtime[]
}
