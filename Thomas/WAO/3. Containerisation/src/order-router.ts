import { Router } from "express";
import { Orders } from "../controllers/order-controller";

const router = Router();

router.get("", Orders.list); // GET /orders
router.get("/:uid", Orders.read); // GET /orders/:uid
router.post("", Orders.create); // POST /orders
router.put("/:uid", Orders.update); // PUT /orders/:uid
router.patch("/:uid", Orders.patchUpdate); // PATCH /orders/:uid (partial update??)
router.delete("/:uid", Orders.remove); // DELETE /orders/:uid

export const orders = router;
