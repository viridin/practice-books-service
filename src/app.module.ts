import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { MqttModule } from './mqtt/mqtt.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-db',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Book],
      autoLoadEntities: true,
      synchronize: true, //false!!!
    }),
    BooksModule,
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
