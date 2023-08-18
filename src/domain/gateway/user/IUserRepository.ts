import CreateUserRequestDto from '../../entities/user/CreateUserRequestDto';
import AddUserAccountRequestDto from '../../entities/user/AddUserAccountRequestDto';
import User from '../../entities/user/User';

export default interface IUserRepository {
  createUser(user: CreateUserRequestDto): Promise<User>;
  addUserAccount(user: AddUserAccountRequestDto): Promise<User>;
  getUserById(idUser: string): Promise<User>;
  getUserByAccountNumber(accountNumber: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
}
