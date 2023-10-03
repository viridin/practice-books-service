import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookUser } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let app: INestApplication;

  const mockBookUserSevice = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
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
    controller = module.get<UserController>(UserController);
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
            username: 'testuser', password: 'testpassword'
        };
        const createdUserData: BookUser = { 
            id: 1, username: 'testuser', password: 'testpassword'
        };

    mockBookUserSevice.create.mockReturnValue(createdUserData);

    const response = await request(app.getHttpServer())
    .post('/users/register')
    .send(newUserData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdUserData);
    });
  });

  describe('login', () => {
    it('should log in an existing user', async () => {
        const loginUserData: Partial<BookUser> = {
            username: 'testuser', password: 'testpassword'
        };

    mockBookUserSevice.create.mockReturnValue(loginUserData);
    
    const req = {
        body: loginUserData,
      };

    const response = await request(app.getHttpServer())
    .post('/users/login')
    .send(req);

    expect(response.status).toBe(201);
    });
  });
});
