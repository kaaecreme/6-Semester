"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const json = express_1.default.Router();
var te = 'test';
console.log(te);
json.use(body_parser_1.default.json());
json.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});
json.get('/', function (req, res) {
    res.json('Hello from json root route.');
});
json.post('/', function (req, res) {
    const jsonData = req.body;
    res.status(200).json(jsonData);
});
exports.default = json;
//# sourceMappingURL=json.js.map