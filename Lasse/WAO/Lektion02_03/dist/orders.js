"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    material: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    delivery: {
        address: { type: String, required: true },
        date: { type: Date, required: true },
    },
});
// export const schema = new Schema({
//     "material": "Plastic",
//     "amount": 8345839,
//     "currency": "CNY",
//     "price": 624.83,
//     "timestamp":"1614553155000",
//     "delivery":{
//       "first_name": "Jeniffer",
//       "last_name": "Adam",
//       "address":{
//         "street_name": "Blaine",
//         "street_number": "48649",
//         "city": "Linxi"
//       }
//     }
//  });
