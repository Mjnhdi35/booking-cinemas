import { BadRequestException } from '../../core/base/error.base'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Inject } from '../../core/decorators/param.decorator'
import { Ticket } from '../../db/models/tickets/ticket.model'

@Injectable()
export class TicketService {
  constructor(@Inject(Ticket) private ticketModel: typeof Ticket) {}

  async create(body: any) {
    return await this.ticketModel.create(body)
  }
  async find() {
    return await this.ticketModel.find().populate('cinema')
  }
  async findOne(id: string) {
    return await this.ticketModel.findById(id).populate('cinema')
  }
  async update(id: string) {
    return await this.ticketModel.findByIdAndUpdate(id, {
      new: true,
    })
  }
  async delete(id: string) {
    const ticket = await this.ticketModel.findById(id)
    if (!ticket) {
      throw new BadRequestException('Ticket not found')
    }
    await this.ticketModel.findByIdAndDelete(id)
    return 'Ticket successfully deleted'
  }
}
