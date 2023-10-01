import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';
import { BookUser } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LocalAuthController } from './auth/local-auth.contoller';
import * as dotenv from 'dotenv';
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
      entities: [Book, BookUser],
      autoLoadEntities: true,
      synchronize: true, //false!!!
    }),
    BooksModule,
    UserModule,
    AuthModule,
  ],
  controllers: [LocalAuthController],
  providers: [AppService],
})
export class AppModule {}
