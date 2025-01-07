import { UserService } from '../services/user.service'
import { Controller } from '../core/decorators/controller.decorator'
import { Delete, Get, Patch, Post } from '../core/decorators/method.decorator'
import { Body, Param, Req } from '../core/decorators/param.decorator'
import { Protected } from '../decorators/protected.decorator'
import { Request } from '../core/utils/types'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  // @Protected()
  create(@Body() body: CreateUserDto, @Req() req: Request) {
    return this.userService.create(body, req.user)
  }

  @Get()
  // @Protected()
  find(@Req() req: Request) {
    return this.userService.find()
  }

  @Get(':id')
  // @Protected()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  // @Protected()
  delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }

  // onInit() {
  //     console.log('user controller init');
  // }
}
