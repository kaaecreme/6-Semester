import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { BooksDataSource, UserDataSource } from "./datasources.js";
import resolvers from "./resolvers/index.js";
import { readFileSync } from "fs";
import { config as dotenvConfig } from "dotenv";

// Load environment variables from .env file
dotenvConfig();

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface MyContext {
  user;
  dataSources: {
    usersAPI: UserDataSource;
    booksAPI: BooksDataSource;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization || "";

    const usersAPI = new UserDataSource();
    const booksAPI = new BooksDataSource();

    const user = await usersAPI.getUserByToken(token);
    return {
      user,
      dataSources: {
        usersAPI: usersAPI,
        booksAPI: booksAPI,
      },
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);
