import { Controller, Get, Param, Query, Post, Body, NotFoundException, BadRequestException, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiHeader, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('all')
  @ApiResponse({ status: 200, type: [Book], description: 'Returns all books' })
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get()
  @ApiResponse({ status: 200, type: [Book], description: 'Returns a paginated list of books' })
  async findpageAll(
    @Query('limit') limit: number,
    @Query('start') start: number,
  ): Promise<Book[]> {
    return this.booksService.findPageBooks(limit, start);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Book, description: 'Returns a single book by ID' })
  @ApiNotFoundResponse({ description: 'Book with the provided ID not found' })
  async findOne(@Param('id') id: string): Promise<Book> {
    const book = await this.booksService.findOne(+id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token for authentication',
  })
  @ApiBody({ type: Book})
  @ApiResponse({ status: 201, type: Book, description: 'Creates a new book' })
  @ApiBadRequestResponse({ description: 'Title, author, and year are required fields' })
  @ApiBearerAuth()
  async create(@Body() bookData: Partial<Book>): Promise<Book> {
    if (!bookData.title || !bookData.author || !bookData.year) {
      throw new BadRequestException('Title, author, and year are required fields');
    }
    return this.booksService.create(bookData);
  }
}
