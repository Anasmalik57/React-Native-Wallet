import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Creates a SQL connection using our DB URL
export const sql = neon(process.env.DATABASE_URL ||  'postgresql://neondb_owner:npg_cpEohWG35IvZ@ep-misty-silence-aefvezna-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
console.log('====================================');
console.log(process.env.DATABASE_URL);
console.log('====================================');
