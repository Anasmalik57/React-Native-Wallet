import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/connectDB.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionRoute.js";

// Load environment variables first
dotenv.config();

const app = express();
// middleware
app.use(rateLimiter);
app.use(express.json());

export const initDB = async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL ,
    title VARCHAR(255) NOT NULL ,
    amount DECIMAL(10,2) NOT NULL ,
    category VARCHAR(255) NOT NULL ,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE    
    )`;
    console.log("====================================");
    console.log("Database initialized Successfully 😄");
    console.log("====================================");
  } catch (error) {
    console.log("Error Initializing DB ===> ", error);
    process.exit(1); // status code 1 means faliure and 0 means success
  }
};
app.get("/", (req, res) => {
  res.send("it's working buddy");
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
