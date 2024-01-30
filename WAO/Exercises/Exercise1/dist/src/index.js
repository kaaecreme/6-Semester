"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const default_1 = __importDefault(require("../controllers/default"));
const json_1 = __importDefault(require("../controllers/json"));
const port = 3000;
const app = (0, express_1.default)();
app.use('/api/json', json_1.default);
app.use('/api/', default_1.default);
app.listen(port, () => {
    console.debug(`Server running 'multi-router' on port ${port}`);
});
//# sourceMappingURL=index.js.map