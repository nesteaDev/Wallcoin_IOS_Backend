import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateUserDTO {
  @IsString({ message: 'Most be a better string' })
  @MaxLength(5)
  readonly username: string;
  @IsNumber()
  readonly age: number;
}

export class UpdateUserDTO {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;
  @IsString()
  @IsOptional()
  @MaxLength(5)
  readonly username?: string;
  @IsNumber()
  @IsOptional()
  readonly age?: number;
}

export class User {
  readonly id: string;
  readonly username: string;
  readonly age: number;
}
@Injectable()
export class UserService {
  public dataUser: User[] = [
    {
      id: uuid(),
      username: 'Nestea',
      age: 25,
    },
    {
      id: uuid(),
      username: 'Juli',
      age: 27,
    },
    {
      id: uuid(),
      username: 'Dani',
      age: 23,
    },
    {
      id: uuid(),
      username: 'Kevin',
      age: 30,
    },
  ];

  findAll(): User[] {
    return this.dataUser;
  }

  findOneById(id: string): User {
    const userFound: User = this.dataUser.find((u: User) => u.id === id);
    if (!userFound)
      throw new NotFoundException(`Usuario con el id: ${id} no fue encontrado`);
    return userFound;
  }

  createUser(createUserDTO: CreateUserDTO) {
    const newUser: User = {
      id: uuid(),
      ...createUserDTO,
    };
    if (this.dataUser.includes(newUser)) throw BadRequestException;
    this.dataUser.push(newUser);
    return newUser;
  }

  updateUser(id: string, userUpdate: UpdateUserDTO) {
    let userFind: User = this.findOneById(id);
    this.dataUser = this.dataUser.map((user: User) => {
      if (user.id === id) {
        userFind = { ...user, ...userUpdate, id };
        return userFind;
      }
      return user;
    });
    return userFind;
  }

  deleteUser(id: string) {
    const userFind: User = this.findOneById(id);
    this.dataUser = this.dataUser.filter(
      (user: User) => user.id !== userFind.id,
    );
    return userFind;
  }
}
