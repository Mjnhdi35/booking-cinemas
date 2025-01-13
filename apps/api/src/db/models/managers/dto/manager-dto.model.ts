import { Expose } from 'class-transformer'
import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator'
import { ObjectId, Types } from 'mongoose'
import { ICinema } from '../../cinemas/cinema.model'
import { Role } from '../../users/user.model'

export class CreateManagerDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsEnum(Role)
  role: Role

  @Expose()
  @IsString()
  password: string

  @Expose()
  @IsArray()
  @IsOptional()
  cinemas?: Types.ObjectId[] | ICinema[]
}

export class UpdateManagerDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string

  @Expose()
  @IsEnum(Role)
  @IsOptional()
  role?: Role

  @Expose()
  @IsString()
  @IsOptional()
  password?: string

  @Expose()
  @IsArray()
  @IsOptional()
  cinemas?: Types.ObjectId[] | ICinema[]
}
