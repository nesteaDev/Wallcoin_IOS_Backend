import Transaction from '../../entities/transaction/transaction';

export abstract class ITransactionRepository {
  abstract createTransaction(transaction: Transaction): Promise<Transaction>;
  abstract getTransactionsByUserId(
    idUser: string,
  ): Promise<Transaction[] | null>;
  abstract getTransactionsByDestinationUserId(
    destinationUser: string,
  ): Promise<Transaction[] | null>;
}
