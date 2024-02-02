"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const router = (0, express_1.Router)();
router.get("", user_controller_1.Users.list);
router.get(":uid", user_controller_1.Users.read);
exports.users = router;
