"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orders_1 = require("./orders");
const ordersConnection = mongoose_1.default.createConnection("mongodb://root:example@localhost:27017/");
const ordersModel = ordersConnection.model('Orders', orders_1.schema);
const create = async (req, res) => {
    let { id } = await new ordersModel(req.body).save();
    res.json({ id });
};
const read = async (req, res) => {
    const { uid } = req.params;
    let result = await ordersModel.find({ _id: uid }, { __v: 0 }).exec();
    res.json(result);
};
exports.Orders = {
    read, create
};
