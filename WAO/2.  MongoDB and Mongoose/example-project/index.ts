import express from "express";
import { users } from "./src/user-router";
import { utils } from "./src/utils-router";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", users);
app.use("/utils", utils);

app.listen(3000, () => {
  console.log(`Server running exercise2 on ${port}`);
});
