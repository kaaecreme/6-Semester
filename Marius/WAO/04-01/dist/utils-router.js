"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const express_1 = require("express");
const utils_controller_1 = require("./utils-controller");
const router = (0, express_1.Router)();
router.get("/seedData", utils_controller_1.Utils.seedData);
exports.utils = router;
//# sourceMappingURL=utils-router.js.map