import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/connectDB.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionRoute.js";
import job from "./config/cron.js";

// Load environment variables first
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") {
  job.start();
}

// middleware
app.use(rateLimiter);
app.use(express.json());

// ---------------------------------------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
// ---------------------------------------------------

app.use("/api/transactions", transactionsRoute);

// ---------------------------------------------------
const PORT = process.env.PORT;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} 💝`);
  });
});
