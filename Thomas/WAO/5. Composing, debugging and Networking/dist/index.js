"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_router_1 = require("./src/order-router");
const utils_router_1 = require("./src/utils-router");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/orders", order_router_1.orders);
app.use("/utils", utils_router_1.utils);
app.listen(3000, () => {
    console.log(`Server running Exercise  2 with orders on ${port}`);
});
