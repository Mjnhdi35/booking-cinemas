import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param } from '../../core/decorators/param.decorator'
import {
  CreateTicketDto,
  UpdateTicketDto,
} from '../../db/models/tickets/dto/ticket-dto.model'
import { TicketService } from '../../services/tickets/ticket.service'

@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  async create(@Body() body: any, createTicketDto: CreateTicketDto) {
    try {
      const ticket = await this.ticketService.create(body)
      return {
        status: 'success',
        message: 'Ticket created successfully',
        data: ticket,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get()
  async find() {
    try {
      const ticket = await this.ticketService.find()
      return {
        status: 'success',
        data: ticket,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const ticket = await this.ticketService.findOne(id)
      return {
        status: 'success',
        data: ticket,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    try {
      await this.ticketService.update(id)
      return {
        status: 'success',
        message: 'Ticket updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.ticketService.delete(id)
      return {
        status: 'success',
        message: 'Movie deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
