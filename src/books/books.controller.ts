import { Controller, Get, Param, Query, Post, Body, NotFoundException, BadRequestException, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('all')
  async findAll(): Promise<Book[]> {
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
    const book = await this.booksService.findOne(+id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  @Post()
  async create(@Body() bookData: Partial<Book>): Promise<Book> {
    if (!bookData.title) {
      throw new BadRequestException('Title required fields');
    }
    return this.booksService.create(bookData);
  }
}
