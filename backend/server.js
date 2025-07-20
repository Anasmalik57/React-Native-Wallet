import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/connectDB.js";

// Load environment variables first
dotenv.config();

const app = express();
// middleware
app.use(express.json());
// our custom simple middleware
// app.use((req, res, next) => {
//   console.log("Hey we hit a request ad here is the method", req.method);
// });

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

// ====================================================
app.get("/", (req, res) => {
  res.send("it's working buddy");
});
// Get the Transactions
app.get("/api/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const fetched_transactions = await sql`
   SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
   `;
    console.log("🌟====================================🌟");
    console.log(fetched_transactions);
    console.log("🛑====================================🛑");
    res.status(200).json(fetched_transactions);
  } catch (error) {
    console.log("Error in getting the transactions ===> ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create the Transaction
app.post("/api/transactions", async (req, res) => {
  // title, amount, category, user_id
  try {
    const { title, amount, category, user_id } = req.body;
    // Fixed validation logic
    if (!title || !category || !user_id || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await sql`
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `;

    console.log(transaction);

    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error in creating the transaction ===> ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Transaction
app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid Transaction" });
    }

    const delete_transaction = await sql`
     DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    if (delete_transaction.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted Successfully" });
  } catch (error) {
    console.log("Error in deleting the transaction ===> ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} 💝`);
  });
});
