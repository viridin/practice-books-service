import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id') // Define a route with a dynamic parameter
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id); // Convert id to a number if needed
  }

  @Post()
  async create(@Body() bookData: Partial<Book>): Promise<Book> {
    return this.booksService.create(bookData);
  }
}

