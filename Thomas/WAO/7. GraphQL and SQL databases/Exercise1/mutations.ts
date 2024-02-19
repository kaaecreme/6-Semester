import { MutationResolvers } from "../__generated__/resolvers-types";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { hashPassword } from "./authutils.js";
import { GraphQLError } from "graphql";

const mutations: MutationResolvers = {
  addBook: async (_, { title, author }, { dataSources, user }) => {
    if (!user)
      throw new GraphQLError("You must be logged in to query this schema", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    return dataSources.booksAPI.addBook({ title, author });
  },

  registerUser: async (_, { input }, { dataSources }) => {
    const { name, email, password } = input;
    const hashedPassword = await hashPassword(password);

    return await dataSources.usersAPI.registerUser({
      id: uuidv4(),
      name,
      email,
      hashedPassword: hashedPassword,
      token: "",
    });
  },
};

export default mutations;
