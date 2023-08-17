import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const name: string = 'Nestea Turner Dev';
    return `Hello World!, I am ${name}`;
  }
}
