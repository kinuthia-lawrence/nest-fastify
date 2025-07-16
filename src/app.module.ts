import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, BooksModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
