import express from "express";

import { orders } from "./orders-router";
import { utils } from "./utils-router";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/orders", orders);
app.use("/utils", utils);

app.listen(port, () => {
  console.debug(`Server running 'multi-router' on port ${port}`);
});
