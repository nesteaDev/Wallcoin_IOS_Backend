import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export default class OperationAccountRequestDto {
  @IsUUID()
  idAccount: string;
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
