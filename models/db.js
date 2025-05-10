// db.js - Setup the database connection with PostgreSQL
import { Pool }  from 'pg'

// Create a pool of connections to PostgreSQL
const pool = new Pool({
  user: 'postgres',         // Replace with your PostgreSQL username
  host: 'localhost',             // Replace with your PostgreSQL host if needed
  database: 'postgres',     // Replace with your PostgreSQL database name
  password: 'dattu$diwali',     // Replace with your PostgreSQL password
  port: 5432,                   // Default PostgreSQL port
});

// Export the pool for use in other modules
export default pool;
