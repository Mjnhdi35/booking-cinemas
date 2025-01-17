import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { Role } from '../../users/user.model'

export class CreateAdminDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  role: Role = Role.ADMIN

  @Expose()
  @IsString()
  email: string

  @Expose()
  @IsString()
  password: string
}

export class UpdateAdminDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string

  @Expose()
  role: Role = Role.ADMIN

  @Expose()
  @IsString()
  @IsOptional()
  email?: string

  @Expose()
  @IsString()
  @IsOptional()
  password?: string
}
