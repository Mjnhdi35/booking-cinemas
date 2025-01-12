import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { Address } from '../../db/models/address/address.model'
import { UpdateAddressDto } from '../../db/models/address/dto/address-dto.model'

@Injectable()
export class AddressService {
  constructor(@Inject(Address) private addressModel: typeof Address) {}

  async create(body: any) {
    return await this.addressModel.create(body)
  }

  async find() {
    return await this.addressModel.find()
  }

  async findOne(id: string) {
    const address = await this.addressModel.findById(id)
    if (!address) {
      throw new BadRequestException('Address not found')
    }
    return address
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressModel.findById(id)
    if (!address) {
      throw new BadRequestException('Address not found')
    }
    await this.addressModel.findByIdAndUpdate(id, updateAddressDto, {
      new: true,
    })
  }

  async delete(id: string) {
    const address = await this.addressModel.findById(id)
    if (!address) {
      throw new BadRequestException('Address not found')
    }
    await this.addressModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
