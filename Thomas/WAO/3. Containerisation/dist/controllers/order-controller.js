"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = require("../src/order");
// const orderConnection = mongoose.createConnection(process.env.MONGO_URI as string);
const orderConnection = mongoose_1.default.createConnection("mongodb://root:example@mongo:27017");
const OrderModel = orderConnection.model("Order", order_1.orderSchema);
// GET /orders
// DISCLAIMER: ONLY M FILTER WORKS (SORTS BY MATERIAL)
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { f, t, m } = req.query;
    let filter = {};
    if (m) {
        filter = Object.assign(Object.assign({}, filter), { material: m });
    }
    if (f && t) {
        filter = Object.assign(Object.assign({}, filter), { ts: { $gt: f, $lt: t } });
    }
    else {
        if (f) {
            filter = Object.assign(Object.assign({}, filter), { ts: { $gt: f } });
        }
        if (t) {
            filter = Object.assign(Object.assign({}, filter), { ts: { $lt: t } });
        }
    }
    let result = yield OrderModel.find(filter, { __v: 0 }).lean();
    res.json(result);
});
// GET /orders/:uid
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    let result = yield OrderModel.find({ _id: uid });
    res.json(result);
});
// POST /orders
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = yield new OrderModel(req.body).save();
    res.json({ id });
});
// PUT /orders/:uid
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const body = req.body;
    let result = yield OrderModel.updateOne({ _id: uid }, { $set: body }).exec();
    res.json({ uid, result });
});
// PATCH /orders/:uid (partial update??)
const patchUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
// DELETE /orders/:uid
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    let result = yield OrderModel.deleteOne({ _id: uid });
    res.json(result);
});
exports.Orders = {
    list,
    read,
    create,
    update,
    patchUpdate,
    remove,
};
