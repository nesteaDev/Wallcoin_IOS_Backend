import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import Account from '../../../../domain/entities/account/Account';
import OperationAccountRequestDto from '../../../../domain/entities/account/OperationAccountRequestDto';
import { IAccountRepository } from '../../../../domain/gateway/account/IAccountRepository';
import AccountEntity from '../../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UpdateAccountRequestDto from '../../../../domain/entities/account/UpdateAccountRequestDto';
import { TransactionService } from '../transaction/transaction.service';
import TransactionType from '../../../../domain/entities/transaction/TransactionType';
import CreateTransactionRequestDto from '../../../../domain/entities/transaction/CreateTransactionRequestDto';
import UserEntity from '../../entities/user.entity';
import OperationAccountResponseDto from '../../../../domain/entities/account/OperationAccountResponseDto';

@Injectable()
export class AccountService implements IAccountRepository {
  private readonly logger = new Logger('AccountService');
  constructor(
    private readonly transactionService: TransactionService,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async updateFirstAccount(
    idAccount: string,
    dataAccount: UpdateAccountRequestDto,
  ): Promise<Account> {
    const accountEntity = await this.accountRepository.preload({
      idAccount,
      ...dataAccount,
      createdAt: new Date(),
    });
    if (!accountEntity)
      throw new NotFoundException(`Account with ${idAccount} not found`);
    try {
      const accountUpdated = await this.accountRepository.save(accountEntity);
      return accountUpdated as Account;
    } catch (error) {
      this.handleException(error);
    }
  }

  async getAccountByUserId(idUser: string): Promise<Account[] | null> {
    try {
      const accountEntity: AccountEntity[] | AccountEntity =
        await this.accountRepository.find({
          where: [{ idUser }],
        });
      if (!accountEntity)
        throw new NotFoundException(`Accounts for this user not found`);
      return accountEntity as Account[];
    } catch (error) {
      this.logger.log(error);
      this.handleException(error);
    }
  }

  async getAccountByAccountNumber(accountNumber: string): Promise<Account> {
    const accountEntity = await this.accountRepository.findOne({
      where: { accountNumber: accountNumber },
    });
    if (!accountEntity)
      throw new NotFoundException(`Account No. ${accountNumber} not found`);
    return accountEntity as Account;
  }

  async updateBalanceAccount(
    data: OperationAccountRequestDto,
  ): Promise<OperationAccountResponseDto> {
    const {
      accountFind,
      userFind,
      accountUser,
      destinationUserFind,
      accountDestinationUser,
    } = await this.validationData(data);

    if (data.transactionType === TransactionType.DEPOSIT) {
      if (data.idUser !== data.destinationUser)
        throw new BadRequestException(
          `Can't be deposit, validate the destination user`,
        );
      // Realizar la operación de depósito
      accountFind.balance += data.amount;
      accountFind.updatedAt = new Date();
      await this.accountRepository.save(accountFind);
    } else if (data.transactionType === TransactionType.TRANSFER) {
      if (accountFind.balance < data.amount)
        throw new BadRequestException(
          `Insufficient balance to ${TransactionType.TRANSFER}`,
        );
      if (data.idUser === data.destinationUser)
        throw new BadRequestException(
          `Can't be a transfer, validate the destination user`,
        );
      // Realizar la operación de transferencia
      accountFind.balance -= data.amount;
      accountFind.updatedAt = new Date();
      accountDestinationUser.balance += data.amount;
      accountDestinationUser.updatedAt = new Date();
      await this.accountRepository.save(accountFind);
      await this.accountRepository.save(accountDestinationUser);
    } else if (data.transactionType === TransactionType.PAYMENT_BILL) {
      if (accountFind.balance < data.amount)
        throw new BadRequestException(
          `Insufficient balance to ${TransactionType.PAYMENT_BILL}`,
        );
      if (data.idUser === data.destinationUser)
        throw new BadRequestException(
          `Can't be a transfer, validate the destination user`,
        );
      // Realizar la operación de pago de factura
      accountFind.updatedAt = new Date();
      accountFind.balance -= data.amount;
      await this.accountRepository.save(accountFind);
      throw new Error('Method not implemented');
    } else {
      throw new Error('Invalid transaction type');
    }
    const accountFinal = await this.accountRepository.findOne({
      where: { idAccount: accountFind.idAccount },
    });
    const transaction: CreateTransactionRequestDto = {
      idUser: data.idUser,
      idDestinationUser: data.destinationUser,
      amount: data.amount,
      transactionType: data.transactionType,
      createdAt: new Date(),
    };
    const operationResponse: OperationAccountResponseDto = {
      numberAccountOrigin: accountUser.accountNumber,
      nameAccountOrigin: userFind.name,
      numberAccountDestination: accountDestinationUser.accountNumber,
      nameAccountDestination: destinationUserFind.name,
      balance: accountFinal.balance,
      amount: data.amount,
      transactionType: data.transactionType,
      createdAt: new Date(),
    };

    await this.transactionService.createTransaction(transaction);
    return operationResponse;
  }

  private async validationData(data: OperationAccountRequestDto) {
    // 1. Verificar que exista la cuenta
    const accountFind = await this.accountRepository.findOne({
      where: { idAccount: data.idAccount },
    });
    if (!accountFind) throw new NotFoundException(`Account not found`);
    // 2. Verificar que exista el usuario Origen y su cuenta asociada
    const userFind = await this.userRepository.findOne({
      where: { idUser: data.idUser },
    });
    if (!userFind) throw new NotFoundException(` Origin User not found`);
    // 3. Verificar que exista el usuario Destino y su cuenta asociada
    const destinationUserFind = await this.userRepository.findOne({
      where: { idUser: data.destinationUser },
    });
    if (!destinationUserFind)
      throw new NotFoundException(`Destination User not found`);
    const accountsUserFind = await this.getAccountByUserId(data.idUser);
    if (accountsUserFind[0].accountNumber === null)
      throw new NotFoundException(` Origin User don't have an account`);
    const accountsDestinationUserFind = await this.getAccountByUserId(
      data.destinationUser,
    );
    if (accountsDestinationUserFind[0].accountNumber === null)
      throw new NotFoundException(`Destination User don't have an account`);
    if (accountFind.idUser !== data.idUser)
      throw new BadRequestException(`User does not own this account`);
    const accountUser = accountsUserFind[0];
    const accountDestinationUser = accountsDestinationUserFind[0];
    return {
      accountFind,
      userFind,
      accountUser,
      destinationUserFind,
      accountDestinationUser,
    };
  }

  private handleException(error: any) {
    switch (error.code) {
      case '23505':
        throw new BadRequestException(error.detail);
      case '23503':
        throw new BadRequestException(error.detail);
      case '66061':
        throw new BadRequestException(error.detail);
      default:
        throw new InternalServerErrorException(
          'Unexpected error, check server logs',
        );
    }
  }
}
