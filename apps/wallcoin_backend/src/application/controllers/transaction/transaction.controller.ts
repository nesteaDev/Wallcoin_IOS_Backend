import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import CreateTransactionRequestDto from '../../../domain/entities/transaction/CreateTransactionRequestDto';
import PaginationTransactionDto from '../../../domain/entities/transaction/PaginationTransactionDto';
import { ITransactionRepository } from '../../../domain/gateway/transaction/ITransactionRepository';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: ITransactionRepository) {}

  @Post()
  async createTransaction(@Body() transaction: CreateTransactionRequestDto) {
    const createdTransaction =
      await this.transactionService.createTransaction(transaction);
    return createdTransaction;
  }

  @Get('user/:idUser')
  async getTransactionsByUserId(@Param('idUser') idUser: string) {
    const transactions =
      await this.transactionService.getTransactionsByUserId(idUser);
    return transactions;
  }

  @Get()
  async getTransactionsByUserIdPagination(
    @Query() paginationTransactionDto: PaginationTransactionDto,
  ) {
    const transactions =
      await this.transactionService.getTransactionsByUserIdPagination(
        paginationTransactionDto,
      );
    return transactions;
  }
}
