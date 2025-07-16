export class Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  publisher?: string;
  created_at: Date;
  updated_at: Date;
  picture_url?: string;
}
