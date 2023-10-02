import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { AuthGuard } from '@nestjs/passport';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('BooksController', () => {
  let controller: BooksController;
  let app: INestApplication;

  const mockBooksService = {
    findAll: jest.fn(),
    findPageBooks: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /books/all', () => {
    it('should return an array of books', async () => {
      const books: Book[] = [
        { id: 1, title: 'Book 1', author: 'Author 1', year: 2020 },
        { id: 2, title: 'Book 2', author: 'Author 2', year: 2021 },
      ];

      mockBooksService.findAll.mockReturnValue(books);

      const response = await request(app.getHttpServer()).get('/books/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(books);
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by ID', async () => {
      const bookId = 1;
      const book: Book = {
        id: bookId,
        title: 'Book 1',
        author: 'Author 1',
        year: 2020,
      };

      mockBooksService.findOne.mockReturnValue(book);

      const response = await request(app.getHttpServer()).get(`/books/${bookId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(book);
    });

    it('should return a 404 status if the book is not found', async () => {
      const nonExistentBookId = 999;
      mockBooksService.findOne.mockReturnValue(undefined);

      const response = await request(app.getHttpServer()).get(`/books/${nonExistentBookId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /books', () => {
    it('should return a paginated list of books', async () => {
      const limit = 10;
      const start = 0;
      const paginatedBooks: Book[] = [
        { id: 1, title: 'Book 1', author: 'Author 1', year: 2020 },
        { id: 2, title: 'Book 2', author: 'Author 2', year: 2021 },
      ];

      mockBooksService.findPageBooks.mockReturnValue(paginatedBooks);

      const response = await request(app.getHttpServer()).get('/books').query({ limit, start });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(paginatedBooks);
    });
  });

  describe('POST /books', () => {
    it('should create a new book', async () => {
      const newBookData: Partial<Book> = {
        title: 'New Book',
        author: 'New Author',
        year: 2022,
      };
      const createdBook: Book = { 
        id: 3,
  title: 'New Book',
  author: 'New Author',
  year: 2022,
       };

      mockBooksService.create.mockReturnValue(createdBook);

      const response = await request(app.getHttpServer())
        .post('/books')
        .send(newBookData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdBook);
    });
  });
});
