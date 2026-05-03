import { Router } from "express";
import { poolPromise } from "../config/db";

const router = Router();

// Tüm aktif araçları getirir
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT 
        arac_id,
        arac_adi,
        marka,
        model,
        kisi_kapasitesi,
        bagaj_kapasitesi,
        aciklama,
        resim_url,
        aktif
      FROM dbo.Araclar
      WHERE aktif = 1
      ORDER BY arac_id DESC
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Araçlar listelenirken hata:", error);
    res.status(500).json({ message: "Araçlar listelenemedi" });
  }
});

// Tek araç detayı getirir
router.get("/:id", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("arac_id", req.params.id)
      .query(`
        SELECT 
          arac_id,
          arac_adi,
          marka,
          model,
          kisi_kapasitesi,
          bagaj_kapasitesi,
          aciklama,
          resim_url,
          aktif
        FROM dbo.Araclar
        WHERE arac_id = @arac_id AND aktif = 1
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Araç bulunamadı" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Araç detayı getirilirken hata:", error);
    res.status(500).json({ message: "Araç detayı getirilemedi" });
  }
});

export default router;