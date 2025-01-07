import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class UpdateScreenDto {
  @Expose()
  @IsOptional()
  @IsString()
  name?: string

  @Expose()
  @IsOptional()
  @IsString()
  type?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  capacity?: number
}
