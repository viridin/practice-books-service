import { Controller, Request, Post, UseGuards, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiConflictResponse, ApiHeader, ApiBody } from '@nestjs/swagger';
import { BookUser } from 'src/user/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class LocalAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: BookUser})
  @ApiResponse({ 
    status: 200,
    schema: {
      type: 'string', // Specify the response type as a string
      example: 'access_token:<string>', // Provide the example string value
    },
    description: 'User logged in successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiConflictResponse({ description: 'Username not exists' })
  async login(@Request() req) {
    const requestBody = req.body;
    const existingUser = await this.userService.findOne(requestBody.username);
    if (!existingUser) {
      throw new ConflictException('Username not exists');
    }
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiBody({ type: BookUser})
  @ApiResponse({ 
    status: 201,
    schema: {
      type: 'string', // Specify the response type as a string
      example: 'access_token:<string>', // Provide the example string value
    },
    description: 'User registered successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request body or missing fields' })
  @ApiConflictResponse({ description: 'Username already exists' })
  async register(@Request() req) {
    const requestBody = req.body;
    if (!requestBody.username || !requestBody.password) {
      throw new BadRequestException('Username and password are required fields');
    }
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
