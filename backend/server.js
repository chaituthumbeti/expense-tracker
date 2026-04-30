require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const pool = require("./db");
const { randomUUID } = require("crypto");
const crypto = require("crypto");

// POST /expenses
app.post("/expenses", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (!amount || amount <= 0 || !category || !date) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // generate idempotency key
    const keyString = `${amount}-${category}-${description}-${date}`;
    const idempotency_key = crypto
      .createHash("sha256")
      .update(keyString)
      .digest("hex");

    const existing = await pool.query(
      "SELECT * FROM expenses WHERE idempotency_key = $1",
      [idempotency_key],
    );

    if (existing.rows.length > 0) {
      return res.json(existing.rows[0]);
    }

    const id = randomUUID();

    const result = await pool.query(
      `INSERT INTO expenses (id, amount, category, description, date, idempotency_key)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, amount, category, description, date, idempotency_key],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /expenses
app.get("/expenses", async (req, res) => {
  try {
    const { category, sort } = req.query;

    let query = "SELECT * from expenses";
    let values = [];
    let conditions = [];

    if (category) {
      values.push(category);
      conditions.push(`category=$${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY date DESC";

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
