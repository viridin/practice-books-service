import { Controller, Get, Post, Query, Body, ParseIntPipe } from '@nestjs/common';
import { Book } from './book.model';

@Controller('books')
export class BooksController {
  private books: Book[] = [];

  @Get()
  getBooks(
    @Query('limit', ParseIntPipe) limit = 20,
    @Query('start', ParseIntPipe) start = 0,
  ): Book[] {
    const startIndex = start;
    const endIndex = startIndex + limit;
    return this.books.slice(startIndex, endIndex);
  }

  @Post()
  createBook(@Body() bookData: { title: string; author: string; year: number }): Book {
    const id = this.books.length + 1;
    const book = new Book(id, bookData.title, bookData.author, bookData.year);
    this.books.push(book);
    return book;
  }
}
