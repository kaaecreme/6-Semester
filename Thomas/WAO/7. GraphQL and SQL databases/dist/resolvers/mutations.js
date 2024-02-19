import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { hashPassword } from "./authutils.js";
import { GraphQLError } from "graphql";
const mutations = {
    addBook: async (_, { title, author }, { dataSources, user }) => {
        if (!user)
            throw new GraphQLError("you must be logged in to query this schema", {
                extensions: {
                    code: "UNAUTHENTICATED",
                },
            });
        console.log(user.email);
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
