// mqtt.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { BooksModule } from 'src/books/books.module';
import { CustomSerializer } from './custom.serializator';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: "mqtt://broker:1883",
          username: 'user1',
          password: '123456',
          serializer: new CustomSerializer(),
        },
      },
    ]),
    BooksModule,
  ],
  controllers: [MqttController],
})
export class MqttModule {}
