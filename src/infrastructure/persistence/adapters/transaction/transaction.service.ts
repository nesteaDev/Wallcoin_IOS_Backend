import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import Transaction from '../../../../domain/entities/transaction/transaction';
import { ITransactionRepository } from '../../../../domain/gateway/transaction/ITransactionRepository';
import TransactionEntity from '../../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTransactionRequestDto from '../../../../domain/entities/transaction/CreateTransactionRequestDto';
import PaginationTransactionDto from '../../../../domain/entities/transaction/PaginationTransactionDto';

@Injectable()
export class TransactionService implements ITransactionRepository {
  private readonly logger = new Logger('TransactionService');
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}
  async createTransaction(
    transaction: CreateTransactionRequestDto,
  ): Promise<Transaction> {
    this.logger.log('createTransaction ', transaction);
    try {
      transaction.createdAt = new Date();
      const transactionCreated = this.transactionRepository.create(transaction);
      const savedTransaction =
        await this.transactionRepository.save(transactionCreated);
      return savedTransaction as Transaction;
    } catch (error) {
      console.log(error);
      this.handleException(error);
    }
  }
  async getTransactionsByUserId(idUser: string): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionRepository.find({
        where: [{ idUser }, { idDestinationUser: idUser }],
        order: { createdAt: 'DESC' },
      });
      return transactions as Transaction[];
    } catch (error) {
      console.log(error);
      this.handleException(error);
    }
  }

  async getTransactionsByUserIdPagination(
    paginationTransactionDto: PaginationTransactionDto,
  ): Promise<Transaction[]> {
    const { limit = 2, offSet = 0, idUser } = paginationTransactionDto;
    try {
      const transactions = await this.transactionRepository.find({
        take: limit,
        skip: offSet,
        where: [{ idUser }, { idDestinationUser: idUser }],
        order: { createdAt: 'DESC' },
      });
      return transactions as Transaction[];
    } catch (error) {
      console.log(error);
      this.handleException(error);
    }
  }

  private handleException(error: any) {
    switch (error.code) {
      case '23505':
        throw new BadRequestException(error.detail);
      case '23503':
        throw new BadRequestException(error.detail);
      case '66061':
        throw new BadRequestException(error.detail);
      default:
        throw new InternalServerErrorException(
          'Unexpected error, check server logs',
        );
    }
  }
}
