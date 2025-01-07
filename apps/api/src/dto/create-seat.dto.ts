import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateSeatDto {
  @Expose()
  @IsString()
  screenId: string

  @Expose()
  @IsString()
  seatNumber: string

  @Expose()
  @IsNumber()
  row: number

  @Expose()
  @IsOptional()
  @IsString()
  status?: string
}
