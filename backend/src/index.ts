import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { poolPromise } from "./config/db";

// Route Importları
import adminRoutes from "./routes/admin.routes";
import araclarRoutes from "./routes/araclar.routes";
import galeriRoutes from "./routes/galeri.routes";
import hizmetlerRoutes from "./routes/hizmetler.routes";
import rezervasyonlarRoutes from "./routes/rezervasyonlar.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// 1. CORS Middleware (Frontend isteklerine izin ver)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS: Bu origin'e izin verilmiyor."));
      }
    },
    credentials: true,
  })
);

// 2. JSON Gövde Okuyucu (Req.body verilerini almak için)
app.use(express.json());

// 3. API Rotaları (Routes)
app.use("/api/admin", adminRoutes);
app.use("/api/araclar", araclarRoutes);
app.use("/api/galeri", galeriRoutes);
app.use("/api/hizmetler", hizmetlerRoutes);
app.use("/api/rezervasyonlar", rezervasyonlarRoutes);

// 4. Veritabanı bağlantısı hazır olunca sunucuyu başlat
poolPromise
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Sunucu başlatılamadı. Veritabanı bağlantısı başarısız:", err);
    process.exit(1);
  });
