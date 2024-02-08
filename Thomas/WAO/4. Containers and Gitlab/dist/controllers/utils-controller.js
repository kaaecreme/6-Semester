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
exports.Utils = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const promises_1 = require("fs/promises");
const order_1 = require("../src/order");
// const connection = mongoose.createConnection(process.env.MONGO_URI as string);
const connection = mongoose_1.default.createConnection("mongodb://root:example@mongo:27017");
const OrderModel = connection.model("Order", order_1.orderSchema);
const bootstrap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield OrderModel.deleteMany({}).exec();
    let orders = yield (0, promises_1.readFile)("./assets/MOCK_DATA_MATERIALS.json", "utf-8");
    let orderResult = yield OrderModel.insertMany(JSON.parse(orders));
    res.json({
        orders: {
            ids: orderResult.map((u) => u._id),
            count: orderResult.length,
        },
    });
});
exports.Utils = {
    bootstrap,
};
