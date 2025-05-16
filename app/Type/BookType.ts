export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  publicationYear: number;
  language: string;
  categories: string[];
  price: number;
  stockQuantity: number;
  isbn: string;
  numberOfPage:string;
  rating: string;
  imageUrl: string[];
  createAt: Date;
  updateAt: Date;
}
export interface ResponseApiBook{
    code: Number,
    message: string,
    data: Book[]
}