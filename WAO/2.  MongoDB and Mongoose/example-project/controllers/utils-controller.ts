import { Request, Response } from "express";
import mongoose from "mongoose";
import { readFile } from "fs/promises";

import { schema as userSchema } from "../src/user";

const connection = mongoose.createConnection(
  "mongodb://root:example@localhost:27020"
);
const UserModel = connection.model("User", userSchema);

const bootstrap = async (req: Request, res: Response) => {
  await UserModel.deleteMany({}).exec();
  let users = await readFile("../assets/MOCK_DATA_USER.json", "utf-8");
  let userResult = await UserModel.insertMany(JSON.parse(users));

  res.json({
    users: {
      ids: userResult.map((u) => u._id),
      count: userResult.length,
    },
  });
};

export const Utils = {
  bootstrap,
};
