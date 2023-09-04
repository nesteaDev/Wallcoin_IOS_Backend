import TransactionType from '../transaction/TransactionType';

export default class OperationAccountResponseDto {
  numberAccountOrigin: string;
  nameAccountOrigin: string;
  numberAccountDestination: string;
  nameAccountDestination: string;
  amount: number;
  balance: number;
  transactionType: TransactionType;
  createdAt: Date;
}
