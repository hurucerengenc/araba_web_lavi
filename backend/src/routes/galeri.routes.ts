import { Router } from "express";
import { poolPromise } from "../config/db";

const router = Router();

// Galeri görsellerini getirir
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT
        galeri_id,
        baslik,
        aciklama,
        resim_url,
        kategori,
        arac_id,
        siralama,
        kapak_mi,
        aktif,
        eklenme_tarihi
      FROM dbo.Galeri
      WHERE aktif = 1
      ORDER BY siralama ASC, galeri_id DESC
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Galeri listelenirken hata:", error);
    res.status(500).json({ message: "Galeri listelenemedi" });
  }
});

export default router;