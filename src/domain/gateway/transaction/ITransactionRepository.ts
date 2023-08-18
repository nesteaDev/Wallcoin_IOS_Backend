import Transaction from '../../entities/transaction/transaction';

export default interface ITransactionRepository {
  createTransaction(transaction: Transaction): Promise<Transaction>;
  getTransactionsByUserId(idUser: string): Promise<Transaction[] | null>;
  getTransactionsByDestinationUserId(
    destinationUser: string,
  ): Promise<Transaction[] | null>;
}
