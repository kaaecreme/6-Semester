"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const express_1 = require("express");
const utils_controller_1 = require("../controllers/utils-controller");
const router = (0, express_1.Router)();
router.get("/bootstrap", utils_controller_1.Utils.bootstrap);
exports.utils = router;
