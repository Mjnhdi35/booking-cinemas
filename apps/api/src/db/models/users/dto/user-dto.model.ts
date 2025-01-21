import { Expose } from 'class-transformer'
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsString()
  email: string

  @Expose()
  @IsString()
  password: string

  @Expose()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  bookings?: string[]
}

export class UpdateUserDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string

  @Expose()
  @IsString()
  @IsOptional()
  email?: string

  @Expose()
  @IsString()
  @IsOptional()
  password?: string

  @Expose()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  bookings?: string[]
}
