import { Router } from "express";
import { Users } from "../controllers/user-controller";

const router = Router();

router.get("", Users.list);
router.get(":uid", Users.read);

export const users = router;
