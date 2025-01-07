import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { ScreenService } from '../services/screen.service'

@Controller('screen')
export class ScreenController {
  constructor(private screenService: ScreenService) {}

  @Post()
  create(@Body() body: any) {
    return this.screenService.create(body)
  }

  @Get()
  find() {
    return this.screenService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screenService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenDto: any) {
    return this.screenService.update(id, updateScreenDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.screenService.delete(id)
  }
}
