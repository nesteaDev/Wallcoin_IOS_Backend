import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class HubQueueTalkService {
  constructor(@Inject('Micro2_ESCUCHA') private readonly client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  talk() {
    this.client.emit('escucha', 'Estoy hablando desde el talk Micro 1');
  }
}
