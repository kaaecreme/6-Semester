"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const express_1 = require("express");
const orders_controller_1 = require("./orders-controller");
const router = (0, express_1.Router)();
router.get("", orders_controller_1.Orders.listOrders);
router.post("", orders_controller_1.Orders.createOrders);
router.get("/:uid", orders_controller_1.Orders.readOrders);
router.put("/:uid", orders_controller_1.Orders.overwriteOrders);
router.patch("/:uid", orders_controller_1.Orders.updateOrders);
router.delete("/:uid", orders_controller_1.Orders.removeOrders);
exports.orders = router;
//# sourceMappingURL=orders-router.js.map