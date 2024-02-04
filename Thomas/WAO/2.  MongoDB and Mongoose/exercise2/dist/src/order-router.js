"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const express_1 = require("express");
const order_controller_1 = require("../controllers/order-controller");
const router = (0, express_1.Router)();
router.get("", order_controller_1.Orders.list); // GET /orders
router.get("/:uid", order_controller_1.Orders.read); // GET /orders/:uid
router.post("", order_controller_1.Orders.create); // POST /orders
router.put("/:uid", order_controller_1.Orders.update); // PUT /orders/:uid
router.patch("/:uid", order_controller_1.Orders.patchUpdate); // PATCH /orders/:uid (partial update??)
router.delete("/:uid", order_controller_1.Orders.remove); // DELETE /orders/:uid
exports.orders = router;
