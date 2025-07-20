import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Creates a SQL connection using our DB URL
export const sql = neon(
  process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_cpEohWG35IvZ@ep-misty-silence-aefvezna-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);
console.log("====================================");
console.log(process.env.DATABASE_URL);
console.log("====================================");

// ====================================
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
