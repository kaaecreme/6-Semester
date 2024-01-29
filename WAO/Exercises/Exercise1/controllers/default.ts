import express, { Router, Request, Response } from "express";

const defaultRoute: Router = express.Router();

defaultRoute.use((req, res, next) => {
  res.setHeader("Content-Type", "text/plain");
  next();
});

defaultRoute.get("/", function (req: Request, res: Response) {
  res.send("Hello from default root route.");
});

defaultRoute.post("/", function (req: Request, res: Response) {
  res.send("sjjs");
});

export default defaultRoute;
