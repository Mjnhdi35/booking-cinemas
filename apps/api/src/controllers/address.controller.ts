import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { AddressService } from '../services/address.service'

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  create(@Body() body: any) {
    return this.addressService.create(body)
  }

  @Get()
  find() {
    return this.addressService.find()
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
