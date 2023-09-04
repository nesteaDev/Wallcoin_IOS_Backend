import { Controller, Get } from '@nestjs/common';
import { HubQueueTalkService } from './hub_queue_talk.service';

@Controller()
export class HubQueueTalkController {
  constructor(private readonly hubQueueTalkService: HubQueueTalkService) {}

  @Get()
  getHello(): string {
    return this.hubQueueTalkService.getHello();
  }

  @Get('talk')
  talk(): string {
    this.hubQueueTalkService.talk();
    return 'OK';
  }
}
