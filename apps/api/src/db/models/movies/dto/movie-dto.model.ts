import { Expose } from 'class-transformer'
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Genre } from '../movie.model'

export class CreateMovieDto {
  @IsString()
  @Expose()
  title: string

  @IsString()
  @Expose()
  director: string

  @Expose()
  @IsEnum(Genre)
  genre: Genre

  @Expose()
  @IsNumber()
  duration: number

  @Expose()
  @IsDate()
  @IsOptional()
  releaseDate?: Date

  @IsOptional()
  @IsString()
  @Expose()
  posterUrl?: string
}
export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @Expose()
  title?: string

  @IsString()
  @Expose()
  @IsOptional()
  director?: string

  @IsOptional()
  @Expose()
  @IsEnum(Genre)
  genre?: Genre

  @Expose()
  @IsNumber()
  @IsOptional()
  duration?: number

  @Expose()
  @IsDate()
  @IsOptional()
  releaseDate?: Date

  @IsOptional()
  @IsString()
  @Expose()
  posterUrl?: string
}
