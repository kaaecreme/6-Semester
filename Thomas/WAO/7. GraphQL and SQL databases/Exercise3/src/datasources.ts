import {
  AddBookMutationResponse,
  Book,
  LoginResponse,
  RegisterUserMutationResponse,
  User,
} from "./__generated__/resolvers-types";
import { authenticate } from "./resolvers/authutils.js";
import pkg from "pg";

const { Pool } = pkg;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: "mypassword",
});

export class UserDataSource {
  async getUsers() {
    const query = "SELECT * FROM User";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getUserByToken(token) {
    const query = {
      text: "SELECT * FROM User WHERE token = $1",
      values: [token],
    };

    const { rows } = await pool.query(query);
    return rows[0];
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const query = {
      text: "SELECT * FROM User WHERE email = $1 AND hashed_password = $2",
      values: [email, password],
    };
    const { rows } = await pool.query(query);
    const user = rows[0];

    if (!user) {
      return {
        code: "400",
        success: false,
        message: "User not found!",
      };
    }

    return await authenticate(user.id, password, user.hashed_password);
  }

  async registerUser(user: User): Promise<RegisterUserMutationResponse> {
    const { name, email, hashedPassword, token } = user;
    const query = {
      text: "INSERT INTO User(name, email, hashed_password, token) VALUES($1, $2, $3,  $4) RETURNING *",
      values: [name, email, hashedPassword, token],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }
}
export class BooksDataSource {
  async getBooks(): Promise<Book[]> {
    const query = "SELECT * FROM Book";
    const { rows } = await pool.query(query);
    return rows;
  }

  async addBook(book: Book): Promise<AddBookMutationResponse> {
    const { title, author } = book;
    const query = {
      text: "INSERT INTO Book(title, author) VALUES($1, $2) RETURNING *",
      values: [title, author],
    };
    const { rows } = await pool.query(query);
    const newBook = rows[0];

    if (newBook) {
      return {
        code: "200",
        success: true,
        message: "New book added!",
        book: newBook,
      };
    } else {
      return {
        code: "400",
        success: false,
        message: "Failed to add book",
        book: null,
      };
    }
  }
}
