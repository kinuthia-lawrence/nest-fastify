import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.provider';
import { Book } from './entities/book.entity';
import { ResultSetHeader } from 'mysql2';

@Injectable()
export class BooksRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Book[]> {
    const [rows] = await this.db.query('SELECT * FROM books');
    return rows as Book[];
  }

  async findById(id: number): Promise<Book | null> {
    const [rows] = await this.db.query('SELECT * FROM books WHERE id = ?', [
      id,
    ]);
    return (rows[0] as Book[])[0] || null;
  }

  async create(
    book: Omit<Book, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Book> {
    const [result] = await this.db.query(
      'INSERT INTO books (title, author, description, publisher, picture_url) VALUES (?, ?, ?, ?, ?)',
      [
        book.title,
        book.author,
        book.description,
        book.publisher,
        book.picture_url,
      ],
    );
    const insertResult = result as ResultSetHeader;
    const created = await this.findById(insertResult.insertId);
    if (!created) throw new Error('Book creation failed');
    return created;
  }

  async update(id: number, book: Partial<Book>): Promise<Book | null> {
    await this.db.query('UPDATE books SET ? WHERE id = ?', [book, id]);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.db.query('DELETE FROM books WHERE id = ?', [id]);
  }
}
