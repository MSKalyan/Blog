// db.js - Setup the database connection with PostgreSQL
import { Pool }  from 'pg'
import dotenv from 'dotenv';

dotenv.config();
// Create a pool of connections to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,         // Replace with your PostgreSQL username
  host: process.env.DB_HOST,             // Replace with your PostgreSQL host if needed
  database: process.env.DB_NAME,     // Replace with your PostgreSQL database name
  password: process.env.DB_PASSWORD,     // Replace with your PostgreSQL password
  port: process.env.DB_PORT,                   // Default PostgreSQL port
});

// Export the pool for use in other modules
export default pool;
