import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import CreateUserRequestDto from 'src/domain/entities/user/CreateUserRequestDto';
import { IUserRepository } from 'src/domain/gateway/user/IUserRepository';

@Controller('user')
export class UserController {
  constructor(private readonly userService: IUserRepository) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() payload: CreateUserRequestDto) {
    return this.userService.createUser(payload);
  }
}
