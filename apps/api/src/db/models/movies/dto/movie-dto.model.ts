import { Expose } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsOptional,
  IsBoolean,
  IsMongoId,
  IsDateString,
} from 'class-validator'
import { Types } from 'mongoose'

export class CreateMovieDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string

  @Expose()
  @IsArray()
  @IsString({ each: true })
  actors: string[]

  @Expose()
  @IsDateString()
  releaseDate: Date

  @Expose()
  @IsString()
  posterUrl: string

  @Expose()
  @IsBoolean()
  featured: boolean

  @Expose()
  @IsArray()
  @IsMongoId({ each: true })
  bookings: Types.ObjectId[]

  @Expose()
  @IsMongoId()
  admin: Types.ObjectId
}

export class UpdateMovieDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title?: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  description?: string

  @Expose()
  @IsArray()
  @IsString({ each: true })
  actors?: string[]

  @Expose()
  @IsDateString()
  releaseDate?: Date

  @Expose()
  @IsString()
  posterUrl?: string

  @Expose()
  @IsBoolean()
  featured?: boolean

  @Expose()
  @IsArray()
  @IsMongoId({ each: true })
  bookings?: Types.ObjectId[]

  @Expose()
  @IsMongoId()
  admin?: Types.ObjectId
}
