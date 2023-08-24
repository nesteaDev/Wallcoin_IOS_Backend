import { NestFactory } from '@nestjs/core';
import { HubQueueServiceModule } from './hub_queue_service.module';

async function bootstrap() {
  const app = await NestFactory.create(HubQueueServiceModule);
  await app.listen(3000);
}
bootstrap();
