import CreateAccountRequestDto from '../../entities/account/CreateAccountRequestDto';
import Account from '../../entities/account/Account';
import OperationAccountRequestDto from '../../entities/account/OperationAccountRequestDto';

export abstract class IAccountRepository {
  abstract createAccount(account: CreateAccountRequestDto): Promise<Account>;
  abstract getAccountByUserId(idUser: string): Promise<Account | null>;
  abstract getAccountByAccountNumber(
    accountNumber: string,
  ): Promise<Account | null>;
  abstract updateBalanceAccount(
    data: OperationAccountRequestDto,
  ): Promise<Account | null>;
}
