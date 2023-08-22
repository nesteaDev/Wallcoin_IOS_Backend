import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserService } from '../infrastructure/persistence/adapters/user/user.service';
import { TransactionService } from '../infrastructure/persistence/adapters/transaction/transaction.service';
import { AccountService } from '../infrastructure/persistence/adapters/account/account.service';
import { UserController } from './controllers/user/user.controller';
import { TransactionController } from './controllers/transaction/transaction.controller';

@Module({
  controllers: [UserController, TransactionController],
  providers: [UserService, TransactionService, AccountService],
  imports: [DomainModule, InfrastructureModule],
})
export class ApplicationModule {}
