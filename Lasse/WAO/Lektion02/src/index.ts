import express from "express";
import ordersRouter from './orders-router'; // Use default import for TypeScript

const app = express();

// Use middleware to parse JSON requests
app.use(express.json());

// Import the routes
app.use('/orders', ordersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
