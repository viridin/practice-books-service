import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-db',
      port: 5432,
      username: 'user',
      password: 'userpass',
      database: 'posdb',
      entities: [Book],
      autoLoadEntities: true,
      synchronize: true, ///////////////////////
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
