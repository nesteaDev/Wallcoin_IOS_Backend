import { Injectable } from '@nestjs/common';
import Transaction from '../../../../domain/entities/transaction/transaction';
import { ITransactionRepository } from '../../../../domain/gateway/transaction/ITransactionRepository';

@Injectable()
export class TransactionService implements ITransactionRepository {
  constructor() {}
  createTransaction(transaction: Transaction): Promise<Transaction> {
    console.log('createTransaction ', transaction);
    throw new Error('Method not implemented.');
  }
  getTransactionsByUserId(idUser: string): Promise<Transaction[]> {
    console.log('getTransactionsByUserId ', idUser);
    throw new Error('Method not implemented.');
  }
  getTransactionsByDestinationUserId(
    destinationUser: string,
  ): Promise<Transaction[]> {
    console.log('getTransactionsByDestinationUserId ', destinationUser);
    throw new Error('Method not implemented.');
  }
}
