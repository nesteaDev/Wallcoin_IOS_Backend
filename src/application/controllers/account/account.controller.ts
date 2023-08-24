import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
} from '@nestjs/common';
import Account from '../../../domain/entities/account/Account';
import OperationAccountRequestDto from '../../../domain/entities/account/OperationAccountRequestDto';
import UpdateAccountRequestDto from '../../../domain/entities/account/UpdateAccountRequestDto';
import { IAccountRepository } from '../../../domain/gateway/account/IAccountRepository';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: IAccountRepository) {}

  @Patch(':id')
  async updateFirstAccount(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dataAccount: UpdateAccountRequestDto,
  ): Promise<Account> {
    return this.accountService.updateFirstAccount(id, dataAccount);
  }

  @Get('user/:idUser')
  async getAccountByUserId(
    @Param('idUser', ParseUUIDPipe) idUser: string,
  ): Promise<Account[]> {
    return this.accountService.getAccountByUserId(idUser);
  }

  @Get('accountNumber/:accountNumber')
  async getAccountByAccountNumber(
    @Param('accountNumber') accountNumber: string,
  ): Promise<Account> {
    return this.accountService.getAccountByAccountNumber(accountNumber);
  }

  @Put('updateBalance')
  async updateBalanceAccount(
    @Body() data: OperationAccountRequestDto,
  ): Promise<Account> {
    return this.accountService.updateBalanceAccount(data);
  }
}
