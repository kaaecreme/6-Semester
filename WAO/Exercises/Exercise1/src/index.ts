import express, { Router, Request, Response } from 'express';
import defaultRoute from '../controllers/default';
import json from '../controllers/json';

const port = 3000;
const app = express();

app.use('/api/json', json);
app.use('/api/', defaultRoute);

app.listen(port, () => {
  console.debug(`Server running 'multi-router' on port ${port}`);
});
