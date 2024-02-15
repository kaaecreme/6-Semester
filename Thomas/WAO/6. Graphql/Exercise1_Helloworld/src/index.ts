import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import root from "./resolvers/userResolvers";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = 8000;

app.listen(PORT);

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
