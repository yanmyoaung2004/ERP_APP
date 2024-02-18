import express, { json } from "express";
import pool from "./database/connection.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

async function startServer() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    console.log("Database is connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    console.log(rows);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
