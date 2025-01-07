import { Expose } from 'class-transformer'
import { IsString, IsNumber } from 'class-validator'

export class CreateScreenDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsString()
  type: string

  @Expose()
  @IsNumber()
  capacity: number
}
