import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param } from '../core/decorators/param.decorator'
import { AdminService } from '../services/admin.service'

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  create(@Body() body: any) {
    return this.adminService.create(body)
  }

  @Get()
  find() {
    return this.adminService.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: any) {
    return this.adminService.update(id, updateAdminDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.adminService.delete(id)
  }
}
