import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserService,
} from '../../services/user/user.service';
import { User } from '../../services/user/user.service';

@Controller('user')
// @UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const element: User = this.userService.findOneById(id);
    if (!element) throw new NotFoundException(`El id: ${id} no fue encontrado`);
    return element;
  }

  @Post()
  createUser(@Body() payload: CreateUserDTO) {
    return this.userService.createUser(payload);
  }

  @Patch(':id')
  updateUser(
    @Body() payload: UpdateUserDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userService.updateUser(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
