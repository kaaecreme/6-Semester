import { Request, Response } from "express";
import mongoose from "mongoose";
import { readFile } from "fs/promises";

import { orderSchema as orderSchema } from "./orders";

const ordersConnection = mongoose.createConnection(
  "mongodb://root:example@mongo:27017/"
);
ordersConnection.useDb("Orders"); // Is used instead of "mongodb://root:example@mongo:27017/orders"
const ordersModel = ordersConnection.model("Order", orderSchema);

const seedData = async (req: Request, res: Response) => {
  await ordersModel.deleteMany({}).exec();

  let orders = await readFile("./assets/MOCK_DATA_MATERIALS.json", "utf-8");
  let ordersResult = await ordersModel.insertMany(JSON.parse(orders));

  res.json({
    orders: {
      ids: ordersResult.map((t) => t._id),
      cnt: ordersResult.length,
    },
  });
};

export const Utils = {
  seedData,
};
