import { QueryResolvers } from "../__generated__/resolvers-types";

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  users: async (_, __, { dataSources }) => {
    return dataSources.usersAPI.getUsers();
  },

  books: async (_, __, { dataSources }) => {
    return dataSources.booksAPI.getBooks();
  },

  user: async (_, { token }, { dataSources }) => {
    return dataSources.usersAPI.getUserByToken(token);
  },

  login: async (_, { email, password }, { dataSources }) => {
    return dataSources.usersAPI.login(email, password);
  },
};

export default queries;
