import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalAuthController } from './auth/local-auth.contoller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';
import { BookUser } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-db',
      port: 5432,
      username: 'user',
      password: 'userpass',
      database: 'newdb',
      entities: [Book, BookUser],
      autoLoadEntities: true,
      synchronize: true, ///////////////////////
    }),
    BooksModule,
    UserModule,
    AuthModule,
  ],
  controllers: [LocalAuthController],
  providers: [AppService],
})
export class AppModule {}
