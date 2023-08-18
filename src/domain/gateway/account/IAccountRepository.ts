import CreateAccountRequestDto from '../../entities/account/CreateAccountRequestDto';
import Account from '../../entities/account/Account';
import OperationAccountRequestDto from '../../entities/account/OperationAccountRequestDto';

export default interface IAccountRepository {
  createAccount(account: CreateAccountRequestDto): Promise<Account>;
  getAccountByUserId(idUser: string): Promise<Account | null>;
  getAccountByAccountNumber(accountNumber: string): Promise<Account | null>;
  updateBalanceAccount(
    data: OperationAccountRequestDto,
  ): Promise<Account | null>;
}
