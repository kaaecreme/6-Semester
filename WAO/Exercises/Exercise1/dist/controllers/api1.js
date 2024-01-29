"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api_v1 = express.Router();
api_v1.get("/", function (req, res) {
    res.send("Hello from APIv1 root route.");
});
api_v1.post("/", function (req, res) {
    res.json({
        message: req.body,
    });
});
module.exports = api_v1;
//# sourceMappingURL=api1.js.map