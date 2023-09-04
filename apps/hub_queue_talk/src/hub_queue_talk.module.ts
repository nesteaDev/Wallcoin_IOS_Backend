import { Module } from '@nestjs/common';
import { HubQueueTalkController } from './hub_queue_talk.controller';
import { HubQueueTalkService } from './hub_queue_talk.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Micro2_ESCUCHA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'hub_queue_talk',
            brokers: ['localhost:9091'],
          },
        },
      },
    ]),
  ],
  controllers: [HubQueueTalkController],
  providers: [HubQueueTalkService],
})
export class HubQueueTalkModule {}
