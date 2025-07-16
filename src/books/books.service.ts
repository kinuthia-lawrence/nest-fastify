import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  create(createBookDto: CreateBookDto) {
    return this.booksRepository.create(createBookDto);
  }

  findAll() {
    return this.booksRepository.findAll();
  }

  findOne(id: number) {
    return this.booksRepository.findById(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
