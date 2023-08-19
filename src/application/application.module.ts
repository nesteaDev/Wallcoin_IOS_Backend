import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [TransactionController, UserController],
  providers: [UserService],
})
export class ApplicationModule {}
