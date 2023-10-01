// src/auth/local-auth.controller.ts
import { Controller, Request, Post, UseGuards, ConflictException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class LocalAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Request() req) {
    const { username, password } = req.body;

    const existingUser = await this.userService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create(username, hashedPassword);
    return this.authService.login(user);
  }
}
