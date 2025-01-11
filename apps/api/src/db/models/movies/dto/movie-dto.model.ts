import { Expose } from 'class-transformer'
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDate,
  IsArray,
} from 'class-validator'
import { Genre } from '../movie.model'

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
  @IsDate()
  releaseDate: Date

  @Expose()
  @IsOptional()
  @IsString()
  posterUrl?: string
}

export class UpdateMovieDto {
  @Expose()
  @IsOptional()
  @IsString()
  title?: string

  @Expose()
  @IsOptional()
  @IsString()
  director?: string

  @Expose()
  @IsOptional()
  @IsEnum(Genre)
  genre?: Genre

  @Expose()
  @IsOptional()
  @IsNumber()
  duration?: number

  @Expose()
  @IsOptional()
  @IsDate()
  releaseDate?: Date

  @Expose()
  @IsOptional()
  @IsString()
  posterUrl?: string
}

export class MovieResponseDto {
  @Expose()
  id: string

  @Expose()
  title: string

  @Expose()
  director: string

  @Expose()
  genre: Genre

  @Expose()
  duration: number

  @Expose()
  releaseDate: Date

  @Expose()
  posterUrl?: string
}
