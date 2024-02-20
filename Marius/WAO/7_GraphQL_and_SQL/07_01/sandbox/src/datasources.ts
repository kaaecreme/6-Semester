// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import { promises } from "dns";
import {
  AddBookMutationResponse,
  Book,
  AddUserMutationResponse,
  User,
  LoginResponse,
} from "./__generated__/resolvers-types";
import { userInfo } from "os";

const BooksDB: Omit<Required<Book>, "__typename">[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const UserDB: Omit<Required<User>, "__typename">[] = [
  {
    id: "1",
    username: "John Doe",
    password: "password",
    token: "1",
  },
];

export class BooksDataSource {
  getBooks(): Book[] {
    // simulate fetching a list of books
    return BooksDB;
  }

  // We are using a static data set for this small example, but normally
  // this Mutation would *mutate* our underlying data using a database
  // or a REST API.
  async addBook(book: Book): Promise<AddBookMutationResponse> {
    if (book.title && book.author) {
      BooksDB.push({ title: book.title, author: book.author });

      return {
        code: "200",
        success: true,
        message: "New book added!",
        book,
      };
    } else {
      return {
        code: "400",
        success: false,
        message: "Invalid input",
        book: null,
      };
    }
  }
}

export class UsersDataSource {
  async addUser(user: User): Promise<AddUserMutationResponse> {
    if (user.username && user.password) {
      UserDB.push({
        id: user.id,
        username: user.username,
        password: user.password,
        token: user.token,
      });

      return {
        code: "200",
        success: true,
        message: "New user added!",
        user,
      };
    } else {
      return {
        code: "400",
        success: false,
        message: "Invalid input",
        user: null,
      };
    }
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const user = UserDB.find((user) => user.username === username);
    if (!user) {
      return {
        code: "400",
        success: false,
        message: "User not found",
      };
    }
  }

  generateUserByToken(token: String): User | undefined {
    return UserDB.find((user) => user.token === token);
  }
}
