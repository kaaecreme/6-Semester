import { authenticate } from "./resolvers/authutils.js";
const UserDB = [
    {
        id: "1",
        name: "John Doe",
        email: "johndoe@gmail.com",
        hashedPassword: "password",
        token: "1",
    },
];
const BooksDB = [
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
    getUsers() {
        return UserDB;
    }
    getUserByToken(token) {
        return UserDB.find((user) => user.token === token);
    }
    async login(email, password) {
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
    async registerUser(user) {
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
    getBooks() {
        return BooksDB;
    }
    async addBook(book) {
        if (book.title && book.author) {
            BooksDB.push({ title: book.title, author: book.author });
            return {
                code: "200",
                success: true,
                message: "New book added!",
                book,
            };
        }
        else {
            return {
                code: "400",
                success: false,
                message: "Invalid input",
                book: null,
            };
        }
    }
}
