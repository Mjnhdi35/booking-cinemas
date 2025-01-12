import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req } from '../../core/decorators/param.decorator'
import {
  CreateAddressDto,
  UpdateAddressDto,
} from '../../db/models/address/dto/address-dto.model'

import { AddressService } from '../../services/address/address.service'

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  async create(@Body() body: any, createAddressDto: CreateAddressDto) {
    try {
      const address = await this.addressService.create(body)
      return {
        status: 'success',
        message: 'address created successfully',
        data: address,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const address = await this.addressService.find()
      return {
        status: 'success',
        data: address,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const address = await this.addressService.findOne(id)
      return {
        status: 'success',
        data: address,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    try {
      await this.addressService.update(id, updateAddressDto)
      return {
        status: 'success',
        message: 'Address updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.addressService.delete(id)
      return {
        status: 'success',
        message: 'Movie deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
