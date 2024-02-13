import express from "express";
import { orders } from "./src/order-router";
import { utils } from "./src/utils-router";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/orders", orders);
app.use("/utils", utils);

app.listen(3000, () => {
  console.log(`Server running Exercise 2 with orders on ${port}`);
});
