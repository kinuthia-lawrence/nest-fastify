import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  exports: [BooksRepository],
})
export class BooksModule {}
