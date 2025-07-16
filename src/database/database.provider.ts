import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

type QueryResult =
  | mysql.RowDataPacket[]
  | mysql.RowDataPacket[][]
  | mysql.OkPacket
  | mysql.OkPacket[]
  | mysql.ResultSetHeader;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: mysql.Pool;

  constructor() {
    // The pool will be initialized after DB/table creation in onModuleInit
  }

  async onModuleInit() {
    // Create database and table if they do not exist
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Password123',
      multipleStatements: true,
    });

    await connection.query(`
      CREATE DATABASE IF NOT EXISTS nest_fastify;
      USE nest_fastify;
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        description TEXT,
        publisher VARCHAR(255),
        picture_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await connection.end();

    // Now initialize the pool for the created database
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Password123',
      database: 'nest_fastify',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async query<T extends QueryResult>(
    sql: string,
    params?: any[],
  ): Promise<[T, mysql.FieldPacket[]]> {
    return this.pool.query<T>(sql, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
