import { Request, Response } from "express";
import mongoose from "mongoose";

import { schema } from "../src/user";

const usersConnection = mongoose.createConnection(
  "mongodb://root:example@localhost:27020"
);
const UserModel = usersConnection.model("User", schema);

const list = async (req: Request, res: Response) => {
  let result = await UserModel.find({}).lean().exec();
  res.json(result);
};

const read = async (req: Request, res: Response) => {
  const { uid } = req.params;
  let result = await UserModel.find({ _id: uid });
  res.json(result);
};

export const Users = {
  list,
  read,
};
