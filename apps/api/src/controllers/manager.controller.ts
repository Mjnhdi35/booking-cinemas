import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { ManagerService } from '../services/manager.service'

@Controller('manager')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Post()
  create(@Body() body: any) {
    return this.managerService.create(body)
  }

  @Get()
  find() {
    return this.managerService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: any) {
    return this.managerService.update(id, updateManagerDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.managerService.delete(id)
  }
}
