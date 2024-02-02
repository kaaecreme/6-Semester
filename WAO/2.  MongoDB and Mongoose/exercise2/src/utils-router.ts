import { Router } from "express";
import { Utils } from "../controllers/utils-controller";

const router = Router();

router.get("/bootstrap", Utils.bootstrap);

export const utils = router;
