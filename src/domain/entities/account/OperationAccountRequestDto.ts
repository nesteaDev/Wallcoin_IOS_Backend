import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';
import TransactionType from '../transaction/TransactionType';

export default class OperationAccountRequestDto {
  @IsUUID()
  @IsNotEmpty()
  idAccount: string;
  @IsUUID()
  @IsNotEmpty()
  idUser: string;
  @IsUUID()
  @IsNotEmpty()
  destinationUser: string;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
  @IsIn([
    TransactionType.DEPOSIT,
    TransactionType.PAYMENT_BILL,
    TransactionType.TRANSFER,
  ])
  transactionType: TransactionType;
}
