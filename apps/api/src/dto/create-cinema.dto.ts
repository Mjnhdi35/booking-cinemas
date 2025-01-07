import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateCinemaDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsString()
  location: string

  @Expose()
  @IsOptional()
  @IsNumber()
  numberOfScreens?: number
}
