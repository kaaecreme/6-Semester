"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defaultRoute = express_1.default.Router();
defaultRoute.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    next();
});
defaultRoute.get('/', function (req, res) {
    res.send('Hello from default root route.');
});
defaultRoute.post('/', function (req, res) {
    res.send('sjjs');
});
exports.default = defaultRoute;
//# sourceMappingURL=default.js.map