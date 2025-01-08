import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { UpdateTicketDto } from '../dto/update-ticket.dto'
import { TicketService } from '../services/ticket.service'

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  create(@Body() body: any) {
    return this.ticketService.create(body)
  }

  @Get()
  find() {
    return this.ticketService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ticketService.delete(id)
  }
}
