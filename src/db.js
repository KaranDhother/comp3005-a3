
// Sets up a connection pool to PostgreSQL.
// Connection settings come from environment variables (see .env.example),
// with defaults that match a typical local install.

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'school',
});

module.exports = pool;
