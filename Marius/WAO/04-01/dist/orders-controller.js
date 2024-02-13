"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orders_1 = require("./orders");
const ordersConnection = mongoose_1.default.createConnection("mongodb://root:example@mongo:27017/");
const ordersModel = ordersConnection.model("Order", orders_1.orderSchema);
ordersConnection.useDb("Orders");
const listOrders = async (req, res) => {
    res.json({ message: "Listed successfully" });
};
const createOrders = async (req, res) => {
    res.json({ message: "Created successfully" });
};
const readOrders = async (req, res) => {
    const ressourceId = req.params;
    res.json({ message: "Read successfully", ressourceId });
};
const overwriteOrders = async (req, res) => {
    const ressourceId = req.params;
    const data = req.body;
    res.json({ message: "Overwritten successfully", ressourceId, data });
};
const updateOrders = async (req, res) => {
    const ressourceId = req.params;
    const data = req.body;
    res.json({ message: "Updated successfully", ressourceId, data });
};
const removeOrders = async (req, res) => {
    const ressourceId = req.params;
    res.json({ message: "Deleted successfully", ressourceId });
};
exports.Orders = {
    listOrders,
    createOrders,
    readOrders,
    overwriteOrders,
    updateOrders,
    removeOrders,
};
//# sourceMappingURL=orders-controller.js.map