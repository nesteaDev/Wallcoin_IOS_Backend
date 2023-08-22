import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateUserRequestDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name?: string;
  @MaxLength(50)
  @IsEmail()
  email?: string;
  @MinLength(5)
  @IsString()
  urlImage?: string;
}
