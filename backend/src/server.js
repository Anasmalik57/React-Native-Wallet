import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/connectDB.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionRoute.js";

// Load environment variables first
dotenv.config();

const app = express();
// middleware
app.use(rateLimiter);
app.use(express.json());

// ---------------------------------------------------

app.use("/api/transactions", transactionsRoute);

// ---------------------------------------------------
const PORT = process.env.PORT;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} 💝`);
  });
});
