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
} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import UserInterface from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    const element: UserInterface = this.userService.findOneById(id);
    if (!element) throw new NotFoundException(`El id: ${id} no fue encontrado`);
    return element;
  }

  @Post()
  createUser(@Body() payload: UserInterface) {
    return payload;
  }

  @Patch(':id')
  updateUser(@Body() payload: UserInterface, id: string) {
    return { payload, id };
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return { id, method: 'delete' };
  }
}
