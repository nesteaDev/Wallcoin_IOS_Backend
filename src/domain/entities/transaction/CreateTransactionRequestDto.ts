export default interface CreateTransactionRequestDto {
  idTransaction?: string;
  idUser: string;
  destinationUser: string;
  amount: number;
  transactionType: string;
}
