import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'
import { Role } from '../../users/user.model'

export class CreateAdminDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  role: Role = Role.ADMIN
}

export class UpdateAdminDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  role: Role = Role.ADMIN
}
