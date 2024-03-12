import books from "../data/bookData.js";
import { addNewBooks } from "../data/bookData.js";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getBooks: () => books,
  },

  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = {
        title,
        author,
      };

      addNewBooks(newBook);
    },
  },
};

export default resolvers;
