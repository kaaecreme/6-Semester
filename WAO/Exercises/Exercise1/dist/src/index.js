"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bla = require("./controllers/api1");
const port = 3000;
const app = express();
app.use(express.text());
app.use("/api/v1", bla);
app.listen(port, (_) => {
    console.debug(`Server running 'multi-router' on port ${port}`);
});
//# sourceMappingURL=index.js.map