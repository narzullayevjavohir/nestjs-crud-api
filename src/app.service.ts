import { Injectable } from "@nestjs/common";
import { Book, books } from "./FakeDatabase";

@Injectable()
export class BookService {
  getAllBooks(): Book[] {
    return books;
  }

  findById(bookId: number): Book | undefined {
    return books.find((book) => book.id === bookId);
  }

  createBook(book: Partial<Book>): Book {
    const newID = books[books.length - 1].id + 1;

    const newBook: Book = {
      id: newID,
      author: book.author ?? "",
      title: book.title ?? "",
      publicationYear: book.publicationYear ?? 0,
    };

    books.push(newBook);

    return newBook;
  }

  updatedBook(
    bookID: number,
    updatedBookFields: Partial<Book>
  ): Book | undefined {
    const currentBook = books.find((book) => book.id === bookID);
    const updatedBook: Book = {
      id: bookID,
      title: updatedBookFields.title ?? currentBook?.title,
      author: updatedBookFields.author ?? currentBook?.author,
      publicationYear:
        updatedBookFields.publicationYear ?? currentBook?.publicationYear,
    };

    books[bookID - 1] = updatedBook;

    return updatedBook;
  }

  removeBook(bookID: number): Book[] {
    books.splice(bookID - 1, 1);
    return books;
  }
}
