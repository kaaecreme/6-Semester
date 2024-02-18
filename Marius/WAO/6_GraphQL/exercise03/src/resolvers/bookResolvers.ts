import books from "../data/bookData";
import { Book } from "../types/books";

const getBooks = (): Book[] => books;

const resolvers = {
  getBooks,
};

export default resolvers;
