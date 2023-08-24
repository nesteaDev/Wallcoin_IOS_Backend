import { NestFactory } from '@nestjs/core';
import { HubQueueServiceModule } from './hub_queue_service.module';

async function bootstrap() {
  const app = await NestFactory.create(HubQueueServiceModule);
  await app.listen(3001);
  console.log(`Server is running on port ${await app.getUrl()}`);
}
bootstrap();
