import { Controller, Get } from '@nestjs/common';
import { HubQueueServiceService } from './hub_queue_service.service';

@Controller()
export class HubQueueServiceController {
  constructor(private readonly hubQueueServiceService: HubQueueServiceService) {}

  @Get()
  getHello(): string {
    return this.hubQueueServiceService.getHello();
  }
}
