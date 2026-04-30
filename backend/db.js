const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // needed for Railway
  },
});

// test connection
pool
  .connect()
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

module.exports = pool;

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS expenses (
      id UUID PRIMARY KEY,
      amount INTEGER NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      idempotency_key TEXT UNIQUE
    );
  `;

  try {
    await pool.query(query);
    console.log("Table ensured");
  } catch (err) {
    console.error("Table creation error:", err);
  }
};

createTable();
