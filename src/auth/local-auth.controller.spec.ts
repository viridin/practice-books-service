import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BookUser } from 'src/user/user.entity';
import { LocalAuthController } from './local-auth.contoller';
import { AuthService } from './auth.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import * as request from 'supertest';
import { UserService } from '../user/user.service';

describe('UserController', () => {
  let controller: LocalAuthController;
  let app: INestApplication;

  
  const mockBookUserSevice = {
    findOne: jest.fn(),
    create: jest.fn(),
  };
  const mockLocalAuthSevice = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalAuthController],
      providers: [{
            provide: AuthService,
            useValue: mockLocalAuthSevice,
          },
          {
            provide: UserService,
            useValue: mockBookUserSevice,
          },],
      imports: [
        PassportModule.register({ defaultStrategy: 'local' }),
      ],
    })
    .overrideGuard(AuthGuard('local')) // Override the local guard
    .useValue({ canActivate: () => true }) // Mock the guard to always return true
    .compile();
    controller = module.get<LocalAuthController>(LocalAuthController);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  
  describe('register', () => {
    it('should register a new user', async () => {
        const newUserData: Partial<BookUser> = {
            username: 'testuser', password: 'testpassword'};

        mockBookUserSevice.create.mockReturnValue(newUserData);

        const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(newUserData);

        expect(response.status).toBe(201);
    });

    it('should return a 400 status if request body is missing required fields', async () => {
        const invalidData = {};
        const response = await request(app.getHttpServer())
          .post('/auth/register')
          .send(invalidData);
  
        expect(response.status).toBe(400);

    });

    it('should throw ConflictException if username already exists', async () => {
        const existingUser = { 
            username: 'existinguser', password: 'existingpassword' };
        
        const newUser = { 
            username: 'existinguser', password: 'newpassword' };

        mockBookUserSevice.findOne.mockReturnValue(existingUser);
        mockLocalAuthSevice.login.mockReturnValue(newUser);

        const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(newUser);

        expect(response.status).toBe(409);
    });
  });

  describe('login', () => {
    it('should log in an existing user', async () => {
        const loginUserData: Partial<BookUser> = {
            username: 'testuser', password: 'testpassword'
        };

        mockLocalAuthSevice.login.mockReturnValue(loginUserData);

        const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUserData);

        expect(response.status).toBe(201);
    });

    it('should throw 409 ConflictException if invalid credentials', async () => {
        const loginUser = { 
            username: 'aaa', password: 'aaa' };

        mockBookUserSevice.findOne.mockReturnValue(null);

        const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);

        expect(response.status).toBe(409);
    });
  });
});
