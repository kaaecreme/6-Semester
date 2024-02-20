import { MutationResolvers } from "../__generated__/resolvers-types";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { generateToken, hashPassword, verifyToken } from "./authutils.js";
import { GraphQLError } from "graphql";

const mutations: MutationResolvers = {
  addBook: async (_, { title, author }, { dataSources, user }) => {
    if (!verifyToken(user.token))
      throw new GraphQLError(
        "You must be logged in to query this schema / Invalid token",
        {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        }
      );
    return dataSources.booksAPI.addBook({ title, author });
  },

  registerUser: async (_, { input }, { dataSources }) => {
    const { name, email, password } = input;
    const id = uuidv4();
    const token = generateToken(id);
    const hashedPassword = await hashPassword(password);

    return await dataSources.usersAPI.registerUser({
      id: uuidv4(),
      name,
      email,
      hashedPassword: hashedPassword,
      token: token,
    });
  },
};

export default mutations;
