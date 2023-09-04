import { NestFactory } from '@nestjs/core';
import { HubQueueServiceModule } from './hub_queue_service.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaMicroservices } from './kafka-microservices.config';

async function bootstrap() {
  const app = await NestFactory.create(HubQueueServiceModule);
  app.connectMicroservice<MicroserviceOptions>(KafkaMicroservices);
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log(
    `🚀 Application LISTENER-MICRO2 is running on: ${await app.getUrl()}`,
  );
}
bootstrap();
