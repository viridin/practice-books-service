import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule,
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: '',
      password: '',
      database: '',
      entities: [],
      autoLoadEntities: true,
    }),*/],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
