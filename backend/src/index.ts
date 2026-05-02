import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { poolPromise } from "./config/db";

import araclarRoutes from "./routes/araclar.routes";
import hizmetlerRoutes from "./routes/hizmetler.routes";
import galeriRoutes from "./routes/galeri.routes";
import rezervasyonlarRoutes from "./routes/rezervasyonlar.routes";

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

// ROUTES
app.use("/api/araclar", araclarRoutes);
app.use("/api/hizmetler", hizmetlerRoutes);
app.use("/api/galeri", galeriRoutes);
app.use("/api/rezervasyonlar", rezervasyonlarRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`);
});