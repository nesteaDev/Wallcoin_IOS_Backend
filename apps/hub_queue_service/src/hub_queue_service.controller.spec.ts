import { Test, TestingModule } from '@nestjs/testing';
import { HubQueueServiceController } from './hub_queue_service.controller';
import { HubQueueServiceService } from './hub_queue_service.service';

describe('HubQueueServiceController', () => {
  let hubQueueServiceController: HubQueueServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HubQueueServiceController],
      providers: [HubQueueServiceService],
    }).compile();

    hubQueueServiceController = app.get<HubQueueServiceController>(HubQueueServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hubQueueServiceController.getHello()).toBe('Hello World!');
    });
  });
});
