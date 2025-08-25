import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
import fs from "fs";
import path from "path";
dotenv.config({ path: './.env' });

const certPath = path.resolve("./ca.pem");

let sslConfig = { rejectUnauthorized: false };

if (fs.existsSync(certPath)) {
  console.log("Using Aiven CA certificate for SSL");
  sslConfig = {
    ca: fs.readFileSync(certPath),
  };
} else {
  console.warn("CA certificate not found. Falling back to insecure SSL.");
}


const pool = mysql.createPool({
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  database: process.env.MYSQL_DATABASE_NAME,
  password:process.env.MYSQL_PASSWORD,
  port:process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl:sslConfig
});

export default pool;