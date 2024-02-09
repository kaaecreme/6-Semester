"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const promises_1 = require("fs/promises");
const orders_1 = require("./orders");
const ordersConnection = mongoose_1.default.createConnection("mongodb://root:example@mongo:27017/");
ordersConnection.useDb("Orders"); // Is used instead of "mongodb://root:example@mongo:27017/orders"
const ordersModel = ordersConnection.model("Order", orders_1.orderSchema);
const seedData = async (req, res) => {
    await ordersModel.deleteMany({}).exec();
    let orders = await (0, promises_1.readFile)("./assets/MOCK_DATA_MATERIALS.json", "utf-8");
    let ordersResult = await ordersModel.insertMany(JSON.parse(orders));
    res.json({
        orders: {
            ids: ordersResult.map((t) => t._id),
            cnt: ordersResult.length,
        },
    });
};
exports.Utils = {
    seedData,
};
//# sourceMappingURL=utils-controller.js.map