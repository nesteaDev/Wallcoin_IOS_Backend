import { Injectable } from '@nestjs/common';

@Injectable()
export class HubQueueServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
