import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export default class CreateAccountRequestDto {
  @IsUUID()
  idUser?: string;
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
  @IsString()
  @IsNotEmpty()
  accountType: string;
}
