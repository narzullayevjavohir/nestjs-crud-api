import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { BookService } from "./app.service";
import { Book } from "./FakeDatabase";

@Controller("books")
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.bookService.getAllBooks();
  }

  @Get("getById/:id")
  getBookById(@Param("id") id: string): Book | undefined {
    const bookID = +id;
    return this.bookService.findById(bookID);
  }

  @Post()
  addBook(@Body() book: Partial<Book>): Book | undefined {
    const bookData = book;
    if (!book.author || !book.title || !book.publicationYear) return undefined;
    return this.bookService.createBook(bookData);
  }

  @Put(":id")
  updateBook(
    @Param("id") id: string,
    @Body() book: Partial<Book>
  ): Book | undefined {
    return this.bookService.updatedBook(+id, book);
  }

  @Delete(":id")
  deleteBooks(@Param("id") id: string): Book[] {
    return this.bookService.removeBook(+id);
  }
}
