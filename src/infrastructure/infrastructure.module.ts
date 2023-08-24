import { Module } from '@nestjs/common';
import { IUserRepository } from '../domain/gateway/user/IUserRepository';
import { IAccountRepository } from '../domain/gateway/account/IAccountRepository';
import { ITransactionRepository } from '../domain/gateway/transaction/ITransactionRepository';

import { AccountService } from './persistence/adapters/account/account.service';
import { UserService } from './persistence/adapters/user/user.service';
import { TransactionService } from './persistence/adapters/transaction/transaction.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './persistence/entities/user.entity';
import AccountEntity from './persistence/entities/account.entity';
import TransactionEntity from './persistence/entities/transaction.entity';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [
    DomainModule,
    TypeOrmModule.forFeature([UserEntity, AccountEntity, TransactionEntity]),
  ],
  providers: [
    { provide: IAccountRepository, useClass: AccountService },
    { provide: IUserRepository, useClass: UserService },
    { provide: ITransactionRepository, useClass: TransactionService },
    TransactionService,
    UserService,
    AccountService,
  ],
  exports: [
    { provide: IAccountRepository, useClass: AccountService },
    { provide: IUserRepository, useClass: UserService },
    { provide: ITransactionRepository, useClass: TransactionService },
  ],
})
export class InfrastructureModule {}
