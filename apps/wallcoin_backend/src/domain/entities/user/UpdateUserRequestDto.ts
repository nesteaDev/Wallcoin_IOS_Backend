import CreateUserRequestDto from './CreateUserRequestDto';
import { PartialType } from '@nestjs/mapped-types';

export default class UpdateUserRequestDto extends PartialType(
  CreateUserRequestDto,
) {}
