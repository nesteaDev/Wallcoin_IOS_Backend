import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import CreateUserRequestDto from '../../../../domain/entities/user/CreateUserRequestDto';
import { IUserRepository } from '../../../../domain/gateway/user/IUserRepository';
import User from '../../../../domain/entities/user/User';
import UserEntity from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AccountEntity from '../../entities/account.entity';
import UpdateUserRequestDto from '../../../../domain/entities/user/UpdateUserRequestDto';
import { TransactionService } from '../transaction/transaction.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserService implements IUserRepository {
  private readonly logger = new Logger('UserService');
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async createUser(userData: CreateUserRequestDto): Promise<User> {
    try {
      const { accounts = [{}], ...userProperties } = userData;

      const user = this.userRepository.create({
        ...userProperties,
        accounts: accounts.map((account) =>
          this.accountRepository.create(account),
        ),
      });
      const userCreated = await this.userRepository.save(user);
      return userCreated as User;
    } catch (error) {
      this.handleException(error);
    }
  }

  async updateUserProfile(
    idUser: string,
    data: UpdateUserRequestDto,
  ): Promise<User> {
    console.log('updateUserAccount ', idUser, data);
    throw new Error('Method not implemented.');
  }

  async getAllUsers(): Promise<User[]> {
    const userList = await this.userRepository.find();
    return userList as User[];
  }

  async getUserById(idUser: string): Promise<User> {
    console.log('getUserById ', idUser);
    const userFind = await this.userRepository.findOne({
      where: { idUser: idUser },
    });
    const accounts = await this.accountService.getAccountByUserId(idUser);
    const transactions =
      await this.transactionService.getTransactionsByUserId(idUser);
    const userResponse: User = {
      ...userFind,
      accounts,
      transactions,
    };
    if (!userFind)
      throw new NotFoundException(`User with id ${idUser} not found`);
    return userResponse as User;
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
