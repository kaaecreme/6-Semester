import { Request, Response } from "express";
import mongoose from "mongoose";

import { orderSchema } from "../src/order";

const orderConnection = mongoose.createConnection(process.env.MONGO_URI as string);
const OrderModel = orderConnection.model("Order", orderSchema);

// GET /orders
// DISCLAIMER: ONLY M FILTER WORKS (SORTS BY MATERIAL)
const list = async (req: Request, res: Response) => {
  const { f, t, m } = req.query;

  let filter = {};

  if (m) {
    filter = { ...filter, material: m };
  }

  if (f && t) {
    filter = { ...filter, ts: { $gt: f, $lt: t } };
  } else {
    if (f) {
      filter = { ...filter, ts: { $gt: f } };
    }
    if (t) {
      filter = { ...filter, ts: { $lt: t } };
    }
  }

  let result = await OrderModel.find(filter, { __v: 0 }).lean();
  res.json(result);
};

// GET /orders/:uid
const read = async (req: Request, res: Response) => {
  const { uid } = req.params;
  let result = await OrderModel.find({ _id: uid });
  res.json(result);
};

// POST /orders
const create = async (req: Request, res: Response) => {
  let { id } = await new OrderModel(req.body).save();
  res.json({ id });
};

// PUT /orders/:uid
const update = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const body = req.body;
  let result = await OrderModel.updateOne({ _id: uid }, { $set: body }).exec();
  res.json({ uid, result });
};

// PATCH /orders/:uid (partial update??)
const patchUpdate = async (req: Request, res: Response) => {};

// DELETE /orders/:uid
const remove = async (req: Request, res: Response) => {
  const { uid } = req.params;
  let result = await OrderModel.deleteOne({ _id: uid });
  res.json(result);
};

export const Orders = {
  list,
  read,
  create,
  update,
  patchUpdate,
  remove,
};
