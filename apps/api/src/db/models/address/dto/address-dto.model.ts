import { Expose } from 'class-transformer'
import { IsString, Length } from 'class-validator'

// DTO for creating a new address
export class createAddressDto {
  @Expose()
  address: string
}

// DTO for updating a address
export class updateAddressDto {
  @Expose()
  @IsString()
  @Length(1, 255)
  address?: string
}

// DTO for responding with user data (output DTO)
export class addressResponseDto {
  @Expose()
  id: string
}
