import { Book } from './book.model';

describe('Book', () => {
  it('should create a book instance with the provided properties', () => {
    const id = 1;
    const title = 'Sample Book';
    const author = 'John Doe';
    const year = 2023;

    const book = new Book(id, title, author, year);

    expect(book).toBeInstanceOf(Book);
    expect(book.id).toEqual(id);
    expect(book.title).toEqual(title);
    expect(book.author).toEqual(author);
    expect(book.year).toEqual(year);
  });
});
