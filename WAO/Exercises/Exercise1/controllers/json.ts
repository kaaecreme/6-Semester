import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

const json: Router = express.Router();

json.use(bodyParser.json());

json.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

json.get('/', function (req: Request, res: Response) {
  res.json('Hello from json root route.');
});

json.post('/', function (req: Request, res: Response) {
  const jsonData = req.body;
  res.status(200).json(jsonData);
});

export default json;
