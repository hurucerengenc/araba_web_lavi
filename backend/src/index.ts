import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import { poolPromise } from "./config/db";

import adminRoutes from "./routes/admin.routes";
import araclarRoutes from "./routes/araclar.routes";
import hizmetlerRoutes from "./routes/hizmetler.routes";
import galeriRoutes from "./routes/galeri.routes";
import rezervasyonlarRoutes from "./routes/rezervasyonlar.routes";

dotenv.config();

const app = express();

/*
  Helmet:
  Backend'e güvenlik HTTP header'ları ekler.
  Örneğin bazı XSS, clickjacking gibi temel web açıklarına karşı ek koruma sağlar.
*/
app.use(helmet());

/*
  CORS:
  Backend'e hangi frontend adresinin istek atabileceğini belirliyoruz.
  Vite React projesi genelde http://localhost:5173 üzerinde çalışır.
*/
app.use(
  cors({
    origin: [ "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://localhost:5177",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/*
  JSON limit:
  Çok büyük body gönderilmesini engeller.
  Form verileri için 1mb fazlasıyla yeterli.
*/
app.use(
  express.json({
    limit: "1mb",
  })
);

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
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`);
});