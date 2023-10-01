// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookUser } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(BookUser)
    private readonly userRepository: Repository<BookUser>,
  ) {}

  async create(username: string, password: string): Promise<BookUser> {
    const user = new BookUser();
    user.username = username;
    user.password = password;
    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<BookUser | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}

//where: { username }