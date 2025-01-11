import { Controller } from '../../core/decorators/controller.decorator'
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../core/decorators/method.decorator'
import { Body, Param, Req } from '../../core/decorators/param.decorator'
import {
  CreateUserDto,
  UpdateUserDto,
} from '../../db/models/users/dto/user-dto.model'
import { UserService } from '../../services/users/user.service'
import { Request } from 'express'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Route to create a new user
  @Post()
  // @Protected()
  async create(@Body() body: CreateUserDto, @Req() req: Request) {
    try {
      const user = await this.userService.create(body, req.user)
      return {
        status: 'success',
        message: 'User created successfully',
        data: user,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  // Route to get all users
  @Get()
  // @Protected() // Uncomment if authentication is required
  async find(@Req() req: Request) {
    try {
      const users = await this.userService.find()
      return {
        status: 'success',
        data: users,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  // Route to get a single user by ID
  @Get(':id')
  // @Protected() // Uncomment if authentication is required
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id)
      return {
        status: 'success',
        data: user,
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  // Route to update user by ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(id, updateUserDto)
      return {
        status: 'success',
        message: 'User updated successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }

  // Route to delete user by ID
  @Delete(':id')
  // @Protected() // Uncomment if authentication is required
  async delete(@Param('id') id: string) {
    try {
      await this.userService.delete(id)
      return {
        status: 'success',
        message: 'User deleted successfully',
      }
    } catch (error: any) {
      return { status: 'error', message: error.message }
    }
  }
}
