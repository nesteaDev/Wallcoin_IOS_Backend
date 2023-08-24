import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import Account from '../account/Account';

export default class CreateUserRequestDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;
  @MaxLength(50)
  @IsEmail()
  email: string;
  @MinLength(5)
  @IsString()
  urlImage: string;
  @IsArray()
  @IsOptional()
  accounts?: Account[];
}
