import { Expose } from 'class-transformer'
import { IsString, IsArray, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ObjectId } from 'mongoose'
import { IScreen } from '../../screens/screen.model'
import { IAddress } from '../../address/address.model'
import { IManager } from '../../managers/manager.model'

export class CreateCinemaDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsArray()
  screen: ObjectId[] | IScreen[]

  @Expose()
  @IsOptional()
  address: ObjectId | IAddress

  @Expose()
  @IsArray()
  manager: ObjectId[] | IManager[]
}

export class UpdateCinemaDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsArray()
  screen: ObjectId[] | IScreen[]

  @Expose()
  @IsOptional()
  address: ObjectId | IAddress

  @Expose()
  @IsArray()
  manager: ObjectId[] | IManager[]
}
