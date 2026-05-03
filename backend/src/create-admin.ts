import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import sql from "mssql";
import { poolPromise } from "./config/db";

dotenv.config();

async function createAdmin() {
  try {
    const kullaniciAdi = "Admin";
    const email = "admin@gmail.com";
    const sifre = "Admin123!";

    const sifreHash = await bcrypt.hash(sifre, 10);

    const pool = await poolPromise;

    const mevcutAdmin = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(`
        SELECT admin_id 
        FROM dbo.Adminler 
        WHERE email = @email
      `);

    if (mevcutAdmin.recordset.length > 0) {
      console.log("Bu email ile admin zaten var.");
      return;
    }

    await pool
      .request()
      .input("kullanici_adi", sql.NVarChar, kullaniciAdi)
      .input("email", sql.NVarChar, email)
      .input("sifre_hash", sql.NVarChar, sifreHash)
      .query(`
        INSERT INTO dbo.Adminler (
          kullanici_adi,
          email,
          sifre_hash
        )
        VALUES (
          @kullanici_adi,
          @email,
          @sifre_hash
        )
      `);

    console.log("Admin başarıyla oluşturuldu.");
    console.log("Email:", email);
    console.log("Şifre:", sifre);
   } catch (error) {
    console.error("Admin oluşturulurken hata:", error);
  }
}

createAdmin();