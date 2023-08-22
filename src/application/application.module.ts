import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserController } from './controllers/user/user.controller';
import { TransactionController } from './controllers/transaction/transaction.controller';

@Module({
  controllers: [UserController, TransactionController],
  providers: [],
  imports: [DomainModule, InfrastructureModule],
})
export class ApplicationModule {}
