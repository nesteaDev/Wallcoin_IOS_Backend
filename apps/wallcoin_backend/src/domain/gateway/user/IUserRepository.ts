import UpdateUserRequestDto from '../../entities/user/UpdateUserRequestDto';
import CreateUserRequestDto from '../../entities/user/CreateUserRequestDto';
import User from '../../entities/user/User';
import UserTokenResponseDto from '../../entities/user/UserTokenResponseDto';

export abstract class IUserRepository {
  abstract createUser(user: CreateUserRequestDto): Promise<User>;
  abstract getUserById(idUser: string): Promise<User>;
  abstract getAllUsers(): Promise<User[]>;
  abstract updateUserProfile(
    idUser: string,
    payload: UpdateUserRequestDto,
  ): Promise<User>;
  abstract getUserByToken(token: string): Promise<UserTokenResponseDto>;
}
