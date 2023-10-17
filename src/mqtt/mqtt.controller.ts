// mqtt.controller.ts
import { Controller, Post, Inject } from '@nestjs/common';
import { Payload, Ctx, MqttContext, MessagePattern, ClientProxy } from '@nestjs/microservices';
import { BooksService } from '../books/books.service';
import { Book } from '../books/book.entity';

@Controller()
export class MqttController {
  constructor(private readonly booksService: BooksService,
  @Inject('MQTT_CLIENT') private readonly mqttClient: ClientProxy,
  ) {}

  @MessagePattern('testtopic') //subscribe to 'testtopic' topic
  async handleData(@Payload() data: any, @Ctx() context: MqttContext): Promise<void> {
    const bookData: Partial<Book> = {
      title: data.title,
    };
    const book = await this.booksService.create(bookData);
    console.log(`Received and saved data from topic1: ${JSON.stringify(book)}`);
  }

  @Post('publish')
  async publishToTopic3(@Payload() postData: any): Promise<void> {
    const topic = 'top';
    await this.mqttClient.emit(topic, postData );
    console.log(`Published data to topic3: ${JSON.stringify(postData)}`);
  }
}
