import { Expose } from 'class-transformer'
import { IsString, IsArray, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ObjectId, Types } from 'mongoose'
import { IScreen } from '../../screens/screen.model'
import { IAddress } from '../../address/address.model'
import { IManager } from '../../managers/manager.model'

export class CreateCinemaDto {
  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsArray()
  screen: Types.ObjectId[] | IScreen[]

  @Expose()
  @IsOptional()
  address: Types.ObjectId | IAddress

  @Expose()
  @IsArray()
  manager: Types.ObjectId[] | IManager[]
}

export class UpdateCinemaDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string

  @Expose()
  @IsArray()
  @IsOptional()
  screen?: Types.ObjectId[] | IScreen[]

  @Expose()
  @IsOptional()
  address?: Types.ObjectId | IAddress

  @Expose()
  @IsArray()
  manager?: Types.ObjectId[] | IManager[]
}
