import express from "express";
import { sql } from "../config/connectDB.js";
import {createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId} from "../controllers/transactionControllers.js"

const router = express.Router();

// ===================================================
// ==-------------- For Transactions ---------------==
// ===================================================
// Get the Transactions
router.get("/:userId", getTransactionsByUserId);

// Create the Transaction
router.post("/", createTransaction);

// Delete Transaction
router.delete("/:id", deleteTransaction);

// ==================================================
// ==------------ For Summary Details -------------==
// ==================================================

router.get("/summary/:userId", getSummaryByUserId);

export default router;
