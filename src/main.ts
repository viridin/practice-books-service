// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://broker:1883',
      username: 'user1',
      password: '123456',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
