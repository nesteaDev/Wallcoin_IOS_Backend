import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserController } from './controllers/user/user.controller';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { AccountController } from './controllers/account/account.controller';

@Module({
  controllers: [UserController, TransactionController, AccountController],
  providers: [],
  imports: [DomainModule, InfrastructureModule],
})
export class ApplicationModule {}
