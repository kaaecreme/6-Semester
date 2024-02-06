import { Request, Response } from "express";
import mongoose from "mongoose";
import { orderSchema } from "./orders";

const ordersConnection = mongoose.createConnection(
  "mongodb://root:example@mongo:27017/"
);
const ordersModel = ordersConnection.model("Order", orderSchema);
ordersConnection.useDb("Orders");

const listOrders = async (req: Request, res: Response) => {
  res.json({ message: "Listed successfully" });
};

const createOrders = async (req: Request, res: Response) => {
  res.json({ message: "Created successfully" });
};

const readOrders = async (req: Request, res: Response) => {
  const ressourceId = req.params;

  res.json({ message: "Read successfully", ressourceId });
};

const overwriteOrders = async (req: Request, res: Response) => {
  const ressourceId = req.params;
  const data = req.body;

  res.json({ message: "Overwritten successfully", ressourceId, data });
};

const updateOrders = async (req: Request, res: Response) => {
  const ressourceId = req.params;
  const data = req.body;

  res.json({ message: "Updated successfully", ressourceId, data });
};

const removeOrders = async (req: Request, res: Response) => {
  const ressourceId = req.params;

  res.json({ message: "Deleted successfully", ressourceId });
};

export const Orders = {
  listOrders,
  createOrders,
  readOrders,
  overwriteOrders,
  updateOrders,
  removeOrders,
};
