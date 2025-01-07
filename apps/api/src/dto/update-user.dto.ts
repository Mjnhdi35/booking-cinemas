import { Expose } from 'class-transformer'
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

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
