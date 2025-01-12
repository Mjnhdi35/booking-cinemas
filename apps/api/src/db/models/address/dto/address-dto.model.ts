import { Expose } from 'class-transformer'
import { IsString, IsNumber, IsOptional } from 'class-validator'
import { ICinema } from '../../cinemas/cinema.model'

export class CreateAddressDto {
  @Expose()
  @IsString()
  address: string

  @Expose()
  @IsNumber()
  lat: number

  @Expose()
  @IsNumber()
  lng: number

  @Expose()
  @IsOptional()
  cinema?: string | ICinema
}

export class UpdateAddressDto {
  @Expose()
  @IsOptional()
  @IsString()
  address?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  lat?: number

  @Expose()
  @IsOptional()
  @IsNumber()
  lng?: number

  @Expose()
  @IsOptional()
  cinema?: string | ICinema
}
