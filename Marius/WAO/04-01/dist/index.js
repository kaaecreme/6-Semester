"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_router_1 = require("./orders-router");
const utils_router_1 = require("./utils-router");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/orders", orders_router_1.orders);
app.use("/utils", utils_router_1.utils);
app.listen(port, () => {
    console.debug(`Server running 'multi-router' on port ${port}`);
});
//# sourceMappingURL=index.js.map