import CreateTransactionRequestDto from 'src/domain/entities/transaction/CreateTransactionRequestDto';
import Transaction from '../../entities/transaction/transaction';
import PaginationTransactionDto from '../../entities/transaction/PaginationTransactionDto';

export abstract class ITransactionRepository {
  abstract createTransaction(
    transaction: CreateTransactionRequestDto,
  ): Promise<Transaction>;
  abstract getTransactionsByUserId(
    idUser: string,
  ): Promise<Transaction[] | null>;
  abstract getTransactionsByUserIdPagination(
    paginationTransactionDto: PaginationTransactionDto,
  ): Promise<Transaction[] | null>;
}
