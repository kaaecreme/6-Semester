import { buildSchema } from "graphql";

// Define the schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

export default schema;
