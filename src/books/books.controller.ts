import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('all')
  async findAll(
    ): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get()
  async findpageAll(
    @Query('limit') limit: number,
    @Query('start') start: number,
    ): Promise<Book[]> {
    return this.booksService.findPageBooks(limit, start);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Post()
  async create(@Body() bookData: Partial<Book>): Promise<Book> {
    return this.booksService.create(bookData);
  }
}

