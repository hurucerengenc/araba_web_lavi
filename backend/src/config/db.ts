import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool: sql.ConnectionPool) => {
    console.log("✅ SQL Server bağlantısı başarılı");
    return pool;
  })
  .catch((err: unknown) => {
    console.error("❌ SQL Server bağlantı hatası:", err);
    throw err;
  });

export { sql };