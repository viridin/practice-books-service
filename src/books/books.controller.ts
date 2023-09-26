import { Controller, Get, Post, Query, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Book } from './book.model';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  private books: Book[] = [];

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list of books' })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'start', type: Number, required: false })
  getBooks(
    @Query('limit', ParseIntPipe) limit = 20,
    @Query('start', ParseIntPipe) start = 0,
  ): Book[] {
    const startIndex = start;
    const endIndex = startIndex + limit;
    return this.books.slice(startIndex, endIndex);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new book' })
  createBook(@Body() bookData: { title: string; author: string; year: number }): Book {
    const id = this.books.length + 1;
    const book = new Book(id, bookData.title, bookData.author, bookData.year);
    this.books.push(book);
    return book;
  }
}
