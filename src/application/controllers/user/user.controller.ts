import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../../../infrastructure/persistence/adapters/user/user.service';
import CreateUserRequestDto from 'src/domain/entities/user/CreateUserRequestDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
