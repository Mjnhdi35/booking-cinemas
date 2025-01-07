import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class UpdateSeatDto {
  @Expose()
  @IsOptional()
  @IsString()
  seatNumber?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  row?: number

  @Expose()
  @IsOptional()
  @IsString()
  status?: string
}
