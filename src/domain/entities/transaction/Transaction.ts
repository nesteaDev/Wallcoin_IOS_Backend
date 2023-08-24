export default class Transaction {
  idTransaction: string;
  idUser: string;
  idDestinationUser: string;
  amount: number;
  createdAt?: Date;
  transactionType: string;
}
