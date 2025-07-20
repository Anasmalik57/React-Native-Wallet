import express from "express";
import { sql } from "../config/connectDB.js";

const router = express.Router();

// ===================================================
// ==-------------- For Transactions ---------------==
// ===================================================
// Get the Transactions
router.get("/:userId", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

// ==================================================
// ==------------ For Summary Details -------------==
// ==================================================

router.get("/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId} 
    `;
    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transactions 
      WHERE user_id = ${userId} AND amount > 0
      `;
    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions 
      WHERE user_id = ${userId} AND amount < 0
      `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error in Getting the Summary ===> ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
