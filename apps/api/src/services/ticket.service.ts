import { BadRequestException } from '../core/base/error.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Inject } from '../core/decorators/param.decorator'
import { Ticket } from '../db/models/ticket.model'

@Injectable()
export class TicketService {
  constructor(@Inject(Ticket) private ticketModel: typeof Ticket) {}

  async create(body: any) {
    return await this.ticketModel.create(body)
  }

  async find() {
    return await this.ticketModel.find()
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel.findById(id)
    if (!ticket) {
      throw new BadRequestException('Ticket not found')
    }
    return ticket
  }

  async update(id: string, updateTicketDto: any) {
    const ticket = await this.ticketModel.findById(id)
    if (!ticket) {
      throw new BadRequestException('Ticket not found')
    }
    await this.ticketModel.findByIdAndUpdate(id, updateTicketDto, { new: true })
  }

  async delete(id: string) {
    const ticket = await this.ticketModel.findById(id)
    if (!ticket) {
      throw new BadRequestException('Ticket not found')
    }
    await this.ticketModel.deleteOne({ _id: id })
    return 'Successfully deleted'
  }
}
