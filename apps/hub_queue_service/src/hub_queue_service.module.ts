import { Module } from '@nestjs/common';
import { HubQueueServiceController } from './hub_queue_service.controller';
import { HubQueueServiceService } from './hub_queue_service.service';

@Module({
  imports: [],
  controllers: [HubQueueServiceController],
  providers: [HubQueueServiceService],
})
export class HubQueueServiceModule {}
