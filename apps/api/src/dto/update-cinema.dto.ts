import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class UpdateCinemaDto {
  @Expose()
  @IsOptional()
  @IsString()
  name?: string

  @Expose()
  @IsOptional()
  @IsString()
  location?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  numberOfScreens?: number
}
