import { Expose } from 'class-transformer'
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

// DTO for creating a new user
export class CreateUserDto {
  @Expose()
  @IsString()
  @Length(1, 255)
  name: string

  @Expose()
  @IsString()
  @IsEmail()
  email: string

  @Expose()
  @IsString()
  @Length(6, 255) // Ensure password has a minimum length
  password: string

  @Expose()
  @IsOptional()
  @IsNumber()
  age?: number
}

// DTO for updating a user
export class UpdateUserDto {
  @Expose()
  @IsOptional()
  @IsString()
  name?: string

  @Expose()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string

  @Expose()
  @IsOptional()
  @IsString()
  password?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  age?: number
}

// DTO for responding with user data (output DTO)
export class UserResponseDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  age?: number

  @Expose()
  role: string

  @Expose()
  bookings: string[]

  @Expose()
  tickets: string[]
}
