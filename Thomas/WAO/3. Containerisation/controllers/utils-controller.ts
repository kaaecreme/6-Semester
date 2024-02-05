import { Request, Response } from "express";
import mongoose from "mongoose";
import { readFile } from "fs/promises";

import { orderSchema as orderSchema } from "../src/order";

// const connection = mongoose.createConnection(process.env.MONGO_URI as string);
const connection = mongoose.createConnection(
  "mongodb://root:example@mongo:27017"
);
const OrderModel = connection.model("Order", orderSchema);

const bootstrap = async (req: Request, res: Response) => {
  await OrderModel.deleteMany({}).exec();
  let orders = await readFile("./assets/MOCK_DATA_MATERIALS.json", "utf-8");
  let orderResult = await OrderModel.insertMany(JSON.parse(orders));

  res.json({
    orders: {
      ids: orderResult.map((u) => u._id),
      count: orderResult.length,
    },
  });
};

export const Utils = {
  bootstrap,
};
