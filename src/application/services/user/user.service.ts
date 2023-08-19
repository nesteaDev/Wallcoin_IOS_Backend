import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export default interface UserInterface {
  id: string;
  username: string;
  age: number;
}
@Injectable()
export class UserService {
  public dataUser: UserInterface[] = [
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

  findAll(): UserInterface[] {
    return this.dataUser;
  }

  findOneById(id: string): UserInterface {
    return this.dataUser.find((u: UserInterface) => u.id === id);
  }
}
