"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    email: { type: String, required: false },
});
