import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import CreateUserRequestDto from '../../../domain/entities/user/CreateUserRequestDto';
import { IUserRepository } from '../../../domain/gateway/user/IUserRepository';
import UpdateUserRequestDto from '../../../domain/entities/user/UpdateUserRequestDto';

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

  @Get('validate/:token')
  getUserByToken(@Param('token') token: string) {
    return this.userService.getUserByToken(token);
  }

  @Patch(':id')
  updateUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserRequestDto,
  ) {
    return this.userService.updateUserProfile(id, payload);
  }

  @Post()
  createUser(@Body() payload: CreateUserRequestDto) {
    return this.userService.createUser(payload);
  }
}
