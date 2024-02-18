// index.ts
import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import root from "./resolvers/demoResolver";

// Set up Express
const app = express();
const port = 5555;

// Set up GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Express is working!");
});

// Start server
app.listen(port, () => {
  console.log("Listening on port:" + port);
});
