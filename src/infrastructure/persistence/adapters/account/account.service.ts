import { Injectable } from '@nestjs/common';
import Account from '../../../../domain/entities/account/Account';
import CreateAccountRequestDto from '../../../../domain/entities/account/CreateAccountRequestDto';
import OperationAccountRequestDto from '../../../../domain/entities/account/OperationAccountRequestDto';
import { IAccountRepository } from '../../../../domain/gateway/account/IAccountRepository';

@Injectable()
export class AccountService implements IAccountRepository {
  constructor() {}
  createAccount(account: CreateAccountRequestDto): Promise<Account> {
    console.log('createAccount ', account);
    throw new Error('Method not implemented.');
  }
  getAccountByUserId(idUser: string): Promise<Account> {
    console.log('getAccountByUserId ', idUser);
    throw new Error('Method not implemented.');
  }
  getAccountByAccountNumber(accountNumber: string): Promise<Account> {
    console.log('getAccountByAccountNumber ', accountNumber);
    throw new Error('Method not implemented.');
  }
  updateBalanceAccount(data: OperationAccountRequestDto): Promise<Account> {
    console.log('updateBalanceAccount ', data);
    throw new Error('Method not implemented.');
  }
}
