import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req } from '../../core/decorators/param.decorator'
import { createAddressDto } from '../../db/models/address/dto/address-dto.model'
import { AddressService } from '../../services/address/address.service'

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  async create(@Body() body: createAddressDto) {
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
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: any) {
    return this.addressService.update(id, updateAddressDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.addressService.delete(id)
  }
}
