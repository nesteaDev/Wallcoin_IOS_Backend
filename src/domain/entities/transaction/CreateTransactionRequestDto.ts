import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export default class CreateTransactionRequestDto {
  @IsUUID()
  idUser: string;
  @IsUUID()
  destinationUser: string;
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsString()
  transactionType: string;
}
