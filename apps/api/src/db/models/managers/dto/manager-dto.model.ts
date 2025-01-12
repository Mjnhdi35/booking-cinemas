import { Expose } from 'class-transformer'
import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator'
import { ObjectId } from 'mongoose'
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
  @IsArray()
  @IsOptional()
  cinemas: ObjectId[] | ICinema[]
}

export class UpdateManagerDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsEnum(Role)
  role: Role

  @Expose()
  @IsArray()
  @IsOptional()
  cinemas: ObjectId[] | ICinema[]
}
