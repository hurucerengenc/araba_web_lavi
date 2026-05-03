import { Router } from "express";
import sql from "mssql";
import { poolPromise } from "../config/db";
import { adminAuth } from "../middleware/auth.middleware";

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
  } catch (error: any) {
    console.error("Araçlar listelenirken hata:", error);
    res.status(500).json({
      message: "Araçlar listelenemedi",
      hata: error.message,
    });
  }
});

// Tek araç detayı getirir
router.get("/:id", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("arac_id", sql.Int, Number(req.params.id))
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
  } catch (error: any) {
    console.error("Araç detayı getirilirken hata:", error);
    res.status(500).json({
      message: "Araç detayı getirilemedi",
      hata: error.message,
    });
  }
});

// Admin: Yeni araç ekler
router.post("/", adminAuth, async (req, res) => {
  try {
    const {
      arac_adi,
      marka,
      model,
      kisi_kapasitesi,
      bagaj_kapasitesi,
      aciklama,
      resim_url,
      aktif,
    } = req.body;

    if (!arac_adi || !marka || !model) {
      return res.status(400).json({
        message: "Araç adı, marka ve model zorunludur.",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("arac_adi", sql.NVarChar, arac_adi)
      .input("marka", sql.NVarChar, marka)
      .input("model", sql.NVarChar, model)
      .input(
        "kisi_kapasitesi",
        sql.Int,
        kisi_kapasitesi ? Number(kisi_kapasitesi) : null
      )
      .input(
        "bagaj_kapasitesi",
        sql.Int,
        bagaj_kapasitesi ? Number(bagaj_kapasitesi) : null
      )
      .input("aciklama", sql.NVarChar, aciklama || null)
      .input("resim_url", sql.NVarChar, resim_url || null)
      .input("aktif", sql.Bit, aktif === undefined ? 1 : aktif)
      .query(`
        INSERT INTO dbo.Araclar (
          arac_adi,
          marka,
          model,
          kisi_kapasitesi,
          bagaj_kapasitesi,
          aciklama,
          resim_url,
          aktif
        )
        OUTPUT INSERTED.*
        VALUES (
          @arac_adi,
          @marka,
          @model,
          @kisi_kapasitesi,
          @bagaj_kapasitesi,
          @aciklama,
          @resim_url,
          @aktif
        )
      `);

    res.status(201).json({
      message: "Araç başarıyla eklendi.",
      arac: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Araç eklenirken hata:", error);
    res.status(500).json({
      message: "Araç eklenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

// Admin: Araç günceller
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      arac_adi,
      marka,
      model,
      kisi_kapasitesi,
      bagaj_kapasitesi,
      aciklama,
      resim_url,
      aktif,
    } = req.body;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("arac_id", sql.Int, Number(id))
      .input("arac_adi", sql.NVarChar, arac_adi || null)
      .input("marka", sql.NVarChar, marka || null)
      .input("model", sql.NVarChar, model || null)
      .input(
        "kisi_kapasitesi",
        sql.Int,
        kisi_kapasitesi ? Number(kisi_kapasitesi) : null
      )
      .input(
        "bagaj_kapasitesi",
        sql.Int,
        bagaj_kapasitesi ? Number(bagaj_kapasitesi) : null
      )
      .input("aciklama", sql.NVarChar, aciklama || null)
      .input("resim_url", sql.NVarChar, resim_url || null)
      .input("aktif", sql.Bit, aktif === undefined ? null : aktif)
      .query(`
        UPDATE dbo.Araclar
        SET
          arac_adi = ISNULL(@arac_adi, arac_adi),
          marka = ISNULL(@marka, marka),
          model = ISNULL(@model, model),
          kisi_kapasitesi = ISNULL(@kisi_kapasitesi, kisi_kapasitesi),
          bagaj_kapasitesi = ISNULL(@bagaj_kapasitesi, bagaj_kapasitesi),
          aciklama = ISNULL(@aciklama, aciklama),
          resim_url = ISNULL(@resim_url, resim_url),
          aktif = ISNULL(@aktif, aktif)
        OUTPUT INSERTED.*
        WHERE arac_id = @arac_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Güncellenecek araç bulunamadı.",
      });
    }

    res.json({
      message: "Araç başarıyla güncellendi.",
      arac: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Araç güncellenirken hata:", error);
    res.status(500).json({
      message: "Araç güncellenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

// Admin: Araç siler
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("arac_id", sql.Int, Number(id))
      .query(`
        UPDATE dbo.Araclar
        SET aktif = 0
        OUTPUT INSERTED.*
        WHERE arac_id = @arac_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Silinecek araç bulunamadı.",
      });
    }

    res.json({
      message: "Araç başarıyla pasif hale getirildi.",
      arac: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Araç silinirken hata:", error);
    res.status(500).json({
      message: "Araç silinirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

export default router;