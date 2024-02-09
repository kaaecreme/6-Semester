import { Router } from "express";
import { Orders } from "./orders-controller";

const router = Router();

router.get("", Orders.listOrders);
router.post("", Orders.createOrders);
router.get("/:uid", Orders.readOrders);
router.put("/:uid", Orders.overwriteOrders);
router.patch("/:uid", Orders.updateOrders);
router.delete("/:uid", Orders.removeOrders);

export const orders = router;
