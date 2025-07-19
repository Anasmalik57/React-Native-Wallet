import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Homepage");
});

console.log("====================================");
console.log(`😋 ${PORT} 😋`);
console.log("====================================");

app.listen(PORT, () => {
  console.log("====================================");
  console.log(`Server is running on ${PORT}`);
  console.log("====================================");
});
