import CreateUserRequestDto from '../../entities/user/CreateUserRequestDto';
import User from '../../entities/user/User';

export default interface IUserRepository {
  createUser(user: CreateUserRequestDto): Promise<User>;
  getUserById(idUser: string): Promise<User>;
  getUserByAccountNumber(accountNumber: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
}
