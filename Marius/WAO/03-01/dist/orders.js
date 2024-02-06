"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = exports.deliverySchema = exports.addressSchema = void 0;
const mongoose_1 = require("mongoose");
exports.addressSchema = new mongoose_1.Schema({
    street_name: { type: String, required: true },
    street_number: { type: String, required: true },
    city: { type: String, required: true },
});
exports.deliverySchema = new mongoose_1.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: exports.addressSchema, required: true },
});
exports.orderSchema = new mongoose_1.Schema({
    material: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: String, required: true },
    delivery: { type: exports.deliverySchema, required: true },
});
//# sourceMappingURL=orders.js.map