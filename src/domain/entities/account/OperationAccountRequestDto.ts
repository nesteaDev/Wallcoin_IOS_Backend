export default interface OperationAccountRequestDto {
  idAccount: string;
  idUser: string;
  destinationUser: string;
  amount: number;
  transactionType: string;
}
