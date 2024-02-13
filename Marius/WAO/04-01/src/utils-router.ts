import { Router } from "express";
import { Utils } from "./utils-controller";

const router = Router();

router.get("/seedData", Utils.seedData);

export const utils = router;
