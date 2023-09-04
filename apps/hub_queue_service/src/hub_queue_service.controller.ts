import { Controller, Get } from '@nestjs/common';
import { HubQueueServiceService } from './hub_queue_service.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class HubQueueServiceController {
  constructor(
    private readonly hubQueueServiceService: HubQueueServiceService,
  ) {}

  //MICRO2: Modo Escucha

  @Get()
  getHello(): string {
    return this.hubQueueServiceService.getHello();
  }

  @EventPattern('escucha')
  async handleHubQueueService(data: string) {
    console.log('data:', data);
  }
}
