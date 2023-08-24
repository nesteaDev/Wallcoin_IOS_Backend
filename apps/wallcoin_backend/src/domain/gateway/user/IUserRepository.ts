import UpdateUserRequestDto from '../../entities/user/UpdateUserRequestDto';
import CreateUserRequestDto from '../../entities/user/CreateUserRequestDto';
import User from '../../entities/user/User';

export abstract class IUserRepository {
  abstract createUser(user: CreateUserRequestDto): Promise<User>;
  abstract getUserById(idUser: string): Promise<User>;
  abstract getAllUsers(): Promise<User[]>;
  abstract updateUserProfile(
    idUser: string,
    payload: UpdateUserRequestDto,
  ): Promise<User>;
  // abstract getUserByAccountNumber(accountNumber: string): Promise<User>;
}
