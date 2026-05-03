import { Router } from "express";
import sql from "mssql";
import { poolPromise } from "../config/db";
import { adminAuth } from "../middleware/auth.middleware";

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
  } catch (error: any) {
    console.error("Hizmetler listelenirken hata:", error);

    res.status(500).json({
      message: "Hizmetler listelenemedi",
      hata: error.message,
    });
  }
});

// Tek hizmet detayı getirir
router.get("/:id", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("hizmet_id", sql.Int, Number(req.params.id))
      .query(`
        SELECT
          hizmet_id,
          hizmet_adi,
          aciklama,
          aktif
        FROM dbo.Hizmetler
        WHERE hizmet_id = @hizmet_id AND aktif = 1
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Hizmet bulunamadı.",
      });
    }

    res.json(result.recordset[0]);
  } catch (error: any) {
    console.error("Hizmet detayı getirilirken hata:", error);

    res.status(500).json({
      message: "Hizmet detayı getirilemedi",
      hata: error.message,
    });
  }
});

// Admin: Yeni hizmet ekler
router.post("/", adminAuth, async (req, res) => {
  try {
    const { hizmet_adi, aciklama, aktif } = req.body;

    if (!hizmet_adi) {
      return res.status(400).json({
        message: "Hizmet adı zorunludur.",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("hizmet_adi", sql.NVarChar, hizmet_adi)
      .input("aciklama", sql.NVarChar, aciklama || null)
      .input("aktif", sql.Bit, aktif === undefined ? 1 : aktif)
      .query(`
        INSERT INTO dbo.Hizmetler (
          hizmet_adi,
          aciklama,
          aktif
        )
        OUTPUT INSERTED.*
        VALUES (
          @hizmet_adi,
          @aciklama,
          @aktif
        )
      `);

    res.status(201).json({
      message: "Hizmet başarıyla eklendi.",
      hizmet: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Hizmet eklenirken hata:", error);

    res.status(500).json({
      message: "Hizmet eklenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

// Admin: Hizmet günceller
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { hizmet_adi, aciklama, aktif } = req.body;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("hizmet_id", sql.Int, Number(id))
      .input("hizmet_adi", sql.NVarChar, hizmet_adi || null)
      .input("aciklama", sql.NVarChar, aciklama || null)
      .input("aktif", sql.Bit, aktif === undefined ? null : aktif)
      .query(`
        UPDATE dbo.Hizmetler
        SET
          hizmet_adi = ISNULL(@hizmet_adi, hizmet_adi),
          aciklama = ISNULL(@aciklama, aciklama),
          aktif = ISNULL(@aktif, aktif)
        OUTPUT INSERTED.*
        WHERE hizmet_id = @hizmet_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Güncellenecek hizmet bulunamadı.",
      });
    }

    res.json({
      message: "Hizmet başarıyla güncellendi.",
      hizmet: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Hizmet güncellenirken hata:", error);

    res.status(500).json({
      message: "Hizmet güncellenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

// Admin: Hizmet siler/pasif hale getirir
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("hizmet_id", sql.Int, Number(id))
      .query(`
        UPDATE dbo.Hizmetler
        SET aktif = 0
        OUTPUT INSERTED.*
        WHERE hizmet_id = @hizmet_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Silinecek hizmet bulunamadı.",
      });
    }

    res.json({
      message: "Hizmet başarıyla pasif hale getirildi.",
      hizmet: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Hizmet silinirken hata:", error);

    res.status(500).json({
      message: "Hizmet silinirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

export default router;