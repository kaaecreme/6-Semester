"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./user");
const usersConnection = mongoose_1.default.createConnection('mongodb://localhost:27017/transactions');
const UserModel = usersConnection.model('User', user_1.schema);
const list = async (req, res) => {
    let result = await UserModel.find({}).lean().exec();
    res.json(result);
};
const read = async (req, res) => {
    const { uid } = req.params;
    let result = await UserModel.find({ _id: uid });
    res.json(result);
};
exports.Users = {
    list, read
};
