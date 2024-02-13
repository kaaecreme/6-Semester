"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_router_1 = __importDefault(require("./orders-router")); // Use default import for TypeScript
const app = (0, express_1.default)();
// Use middleware to parse JSON requests
app.use(express_1.default.json());
// Import the routes
app.use('/orders', orders_router_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
