import UpdateAccountRequestDto from '../../entities/account/UpdateAccountRequestDto';
import Account from '../../entities/account/Account';
import OperationAccountRequestDto from '../../entities/account/OperationAccountRequestDto';
import OperationAccountResponseDto from '../../entities/account/OperationAccountResponseDto';

export abstract class IAccountRepository {
  abstract updateFirstAccount(
    idAccount: string,
    dataAccount: UpdateAccountRequestDto,
  ): Promise<Account>;
  abstract getAccountByUserId(idUser: string): Promise<Account[] | null>;
  abstract getAccountByAccountNumber(
    accountNumber: string,
  ): Promise<Account | null>;
  abstract updateBalanceAccount(
    data: OperationAccountRequestDto,
  ): Promise<OperationAccountResponseDto | null>;
}
