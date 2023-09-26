import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { Book } from './book.model';

describe('BooksController', () => {
  let booksController: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
    }).compile();

    booksController = app.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  it('should return an array of books', () => {
    const books: Book[] = booksController.getBooks();
    expect(Array.isArray(books)).toBe(true);
  });

  it('should create a new book', () => {
    const newBookData = {
      title: 'Test Book',
      author: 'Test Author',
      year: 2023,
    };
    const createdBook: Book = booksController.createBook(newBookData);
    expect(createdBook).toHaveProperty('id');
    expect(createdBook.title).toBe(newBookData.title);
    expect(createdBook.author).toBe(newBookData.author);
    expect(createdBook.year).toBe(newBookData.year);
  });
});
