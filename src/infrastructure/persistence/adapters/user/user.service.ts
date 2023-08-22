import { Injectable, InternalServerErrorException } from '@nestjs/common';
import CreateUserRequestDto from '../../../../domain/entities/user/CreateUserRequestDto';
import { IUserRepository } from '../../../../domain/gateway/user/IUserRepository';
import User from '../../../../domain/entities/user/User';
import UserEntity from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserRequestDto): Promise<User> {
    console.log('createUser ', user);
    try {
      const userCreated = this.userRepository.create(user);
      const savedUser = await this.userRepository.save(userCreated);
      const userAdd: User = {
        idUser: savedUser.idUser,
        name: savedUser.name,
        email: savedUser.email,
        urlImage: savedUser.urlImage,
      };
      return userAdd;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }
  getUserById(idUser: string): Promise<User> {
    console.log('getUserById ', idUser);
    throw new Error('Method not implemented.');
  }
  getUserByAccountNumber(accountNumber: string): Promise<User> {
    console.log('getUserByAccountNumber ', accountNumber);
    throw new Error('Method not implemented.');
  }
  getAllUsers(): Promise<User[]> {
    console.log('getAllUsers ');
    throw new Error('Method not implemented.');
  }
}
