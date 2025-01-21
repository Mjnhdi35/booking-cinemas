import { Expose } from 'class-transformer'
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator'
import { Types } from 'mongoose'

export class CreateAdminDto {
  @Expose()
  @IsEmail()
  email: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string

  @Expose()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  addedMovies?: string[]
}

export class UpdateAdminDto {
  @Expose()
  @IsEmail()
  email?: string

  @Expose()
  @IsString()
  password?: string

  @Expose()
  @IsArray()
  @IsMongoId({ each: true })
  addedMovies?: string[]
}
