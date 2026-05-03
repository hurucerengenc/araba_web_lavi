import express from "express";
import sql from "mssql";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { poolPromise } from "../config/db";
import rateLimit from "express-rate-limit";

const router = express.Router();
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // 15 dakika içinde en fazla 5 deneme
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Çok fazla giriş denemesi yapıldı. Lütfen 15 dakika sonra tekrar deneyin.",
  },
});

/*
  POST /api/admin/login
  Admin girişi yapar.
*/
router.post("/login", adminLoginLimiter, async (req, res) => {
  try {
    const { email, sifre } = req.body;

    if (!email || !sifre) {
      return res.status(400).json({
        message: "Email ve şifre zorunludur.",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(`
        SELECT 
          admin_id,
          kullanici_adi,
          email,
          sifre_hash,
          aktif
        FROM dbo.Adminler
        WHERE email = @email
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({
        message: "Email veya şifre hatalı.",
      });
    }

    const admin = result.recordset[0];

    if (!admin.aktif) {
      return res.status(403).json({
        message: "Bu admin hesabı pasif durumda.",
      });
    }

    const sifreDogruMu = await bcrypt.compare(sifre, admin.sifre_hash);

    if (!sifreDogruMu) {
      return res.status(401).json({
        message: "Email veya şifre hatalı.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET as Secret;

if (!jwtSecret) {
  return res.status(500).json({
    message: "JWT_SECRET .env dosyasında tanımlı değil.",
  });
}

const jwtOptions: SignOptions = {
  expiresIn: "1d",
};

const token = jwt.sign(
  {
    admin_id: admin.admin_id,
    email: admin.email,
    kullanici_adi: admin.kullanici_adi,
  },
  jwtSecret,
  jwtOptions
);

    await pool
      .request()
      .input("admin_id", sql.Int, admin.admin_id)
      .query(`
        UPDATE dbo.Adminler
        SET son_giris_tarihi = GETDATE()
        WHERE admin_id = @admin_id
      `);

    res.json({
      message: "Admin girişi başarılı.",
      token,
      admin: {
        admin_id: admin.admin_id,
        kullanici_adi: admin.kullanici_adi,
        email: admin.email,
      },
    });
  } catch (error: any) {
    console.error("Admin login hatası:", error);

    res.status(500).json({
      message: "Admin girişi sırasında bir hata oluştu.",
      hata: error.message,
    });
  }
});

export default router;