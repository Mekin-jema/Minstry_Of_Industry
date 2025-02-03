import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: `${process.env.DB_PASSWORD}##`, // Removed `##`
  database: process.env.DB_NAME,
});

// Function to test the database connection
const testDBConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connection successful!");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

export default testDBConnection;

// Function to execute queries with error handling
export const query = async (query, params) => {
  try {
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.error("Query execution error:", err.message);
    throw err;
  }
};
