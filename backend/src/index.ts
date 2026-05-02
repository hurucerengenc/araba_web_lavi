import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { poolPromise } from "./config/db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Araç kiralama backend çalışıyor 🚗");
});

app.get("/test-db", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query("SELECT GETDATE() AS tarih");

    res.json({
      message: "Veritabanı bağlantısı başarılı",
      tarih: result.recordset[0].tarih,
    });
  } catch (error) {
    console.error("DB test hatası:", error);
    res.status(500).json({
      message: "Veritabanı bağlantısı başarısız",
      error,
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`);
});