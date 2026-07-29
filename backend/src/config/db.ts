import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "",
  database: process.env.DB_NAME,
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("✅ SQL Server bağlantısı başarılı!");
    return pool;
  })
  .catch((err) => {
    console.error("❌ SQL Server bağlantı hatası:", err);
    throw err;
  });

export default poolPromise;