import {
  AddBookMutationResponse,
  Book,
  LoginResponse,
  RegisterUserMutationResponse,
  User,
} from "./__generated__/resolvers-types";
import { authenticate } from "./resolvers/authutils.js";

const UserDB: Omit<Required<User>, "__typename">[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    hashedPassword: "password",
    token: "1",
  },
];

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

export class UserDataSource {
  getUsers(): User[] {
    return UserDB;
  }

  getUserByToken(token: string): User | undefined {
    return UserDB.find((user) => user.token === token);
  }
  s;

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = UserDB.find((user) => user.email === email);
    if (!user) {
      return {
        code: "400",
        success: false,
        message: "User not found!",
      };
    }
    return await authenticate(user.id, password, user.hashedPassword);
  }

  async registerUser(user: User): Promise<RegisterUserMutationResponse> {
    UserDB.push(user);
    return {
      code: "200",
      success: true,
      message: "User registered successfully!",
      user,
    };
  }
}

export class BooksDataSource {
  getBooks(): Book[] {
    return BooksDB;
  }

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
