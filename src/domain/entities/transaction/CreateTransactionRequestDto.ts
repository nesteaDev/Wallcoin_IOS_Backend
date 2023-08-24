import {
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import TransactionType from './TransactionType';

export default class CreateTransactionRequestDto {
  @IsUUID()
  idUser: string;
  @IsUUID()
  idDestinationUser: string;
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsIn([
    TransactionType.DEPOSIT,
    TransactionType.PAYMENT_BILL,
    TransactionType.TRANSFER,
  ])
  transactionType: TransactionType;
  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
