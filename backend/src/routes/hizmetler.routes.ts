import { Router } from "express";
import { poolPromise } from "../config/db";

const router = Router();

// Tüm aktif hizmetleri getirir
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT
        hizmet_id,
        hizmet_adi,
        aciklama,
        aktif
      FROM dbo.Hizmetler
      WHERE aktif = 1
      ORDER BY hizmet_id DESC
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Hizmetler listelenirken hata:", error);
    res.status(500).json({ message: "Hizmetler listelenemedi" });
  }
});

export default router;