const express = require("express");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/api/health", (req, res) => res.json({ ok: true, version: "1.0.0" }));

app.get("/api/users", async (req, res, next) => {
  try {
    console.log("Getting users");
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("API running on port", process.env.PORT || 3000);
});
