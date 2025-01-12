import { Expose } from 'class-transformer'
import { IsNumber, IsOptional, IsString, Length } from 'class-validator'

// DTO for creating a new address
export class CreateAddressDto {
  @IsString()
  @Expose()
  address: string

  @Expose()
  @IsNumber()
  lat: number

  @Expose()
  @IsNumber()
  lng: number
}

// DTO for updating a address
export class UpdateAddressDto {
  @Expose()
  @IsString()
  @IsOptional()
  address?: string

  @Expose()
  @IsNumber()
  @IsOptional()
  lat?: number

  @Expose()
  @IsNumber()
  @IsOptional()
  lng?: number
}
