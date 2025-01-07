import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator'

export class UpdateMovieDto {
  @Expose()
  @IsOptional()
  @IsString()
  title?: string

  @Expose()
  @IsOptional()
  @IsString()
  genre?: string

  @Expose()
  @IsOptional()
  @IsDate()
  releaseDate?: Date

  @Expose()
  @IsOptional()
  @IsNumber()
  duration?: number
}
