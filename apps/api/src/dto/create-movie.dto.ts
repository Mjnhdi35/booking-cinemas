import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator'

export class CreateMovieDto {
  @Expose()
  @IsString()
  title: string

  @Expose()
  @IsString()
  genre: string

  @Expose()
  @IsDate()
  releaseDate: Date

  @Expose()
  @IsOptional()
  @IsNumber()
  duration?: number
}
