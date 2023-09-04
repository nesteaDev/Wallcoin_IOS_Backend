import { NestFactory } from '@nestjs/core';
import { HubQueueTalkModule } from './hub_queue_talk.module';

async function bootstrap() {
  const app = await NestFactory.create(HubQueueTalkModule);
  await app.listen(3002);
  console.log(
    `🚀 Application TALKER-MICRO1 is running on: ${await app.getUrl()}`,
  );
}
bootstrap();
