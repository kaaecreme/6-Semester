"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./user-router");
const utils_router_1 = require("./utils-router");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/users", user_router_1.users);
app.use("/utils", utils_router_1.utils);
app.listen(3000, () => {
    console.log(`Server running 'example' on ${port}`);
});
