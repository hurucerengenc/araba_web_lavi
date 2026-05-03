import { Router } from "express";
import sql from "mssql";
import { poolPromise } from "../config/db";
import { adminAuth } from "../middleware/auth.middleware";

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
  } catch (error: any) {
    console.error("Galeri listelenirken hata:", error);

    res.status(500).json({
      message: "Galeri listelenemedi",
      hata: error.message,
    });
  }
});

// Tek galeri görselini getirir
router.get("/:id", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("galeri_id", sql.Int, Number(req.params.id))
      .query(`
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
        WHERE galeri_id = @galeri_id AND aktif = 1
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Galeri görseli bulunamadı.",
      });
    }

    res.json(result.recordset[0]);
  } catch (error: any) {
    console.error("Galeri detayı getirilirken hata:", error);

    res.status(500).json({
      message: "Galeri detayı getirilemedi",
      hata: error.message,
    });
  }
});

// Admin: Galeri görseli ekler
router.post("/", adminAuth, async (req, res) => {
  try {
    const {
      baslik,
      aciklama,
      resim_url,
      kategori,
      arac_id,
      siralama,
      kapak_mi,
      aktif,
    } = req.body;

    if (!resim_url) {
      return res.status(400).json({
        message: "Resim URL zorunludur.",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("baslik", sql.NVarChar, baslik || null)
      .input("aciklama", sql.NVarChar, aciklama || null)
      .input("resim_url", sql.NVarChar, resim_url)
      .input("kategori", sql.NVarChar, kategori || null)
      .input("arac_id", sql.Int, arac_id ? Number(arac_id) : null)
      .input("siralama", sql.Int, siralama ? Number(siralama) : 0)
      .input("kapak_mi", sql.Bit, kapak_mi === undefined ? 0 : kapak_mi)
      .input("aktif", sql.Bit, aktif === undefined ? 1 : aktif)
      .query(`
        INSERT INTO dbo.Galeri (
          baslik,
          aciklama,
          resim_url,
          kategori,
          arac_id,
          siralama,
          kapak_mi,
          aktif
        )
        OUTPUT INSERTED.*
        VALUES (
          @baslik,
          @aciklama,
          @resim_url,
          @kategori,
          @arac_id,
          @siralama,
          @kapak_mi,
          @aktif
        )
      `);

    res.status(201).json({
      message: "Galeri görseli başarıyla eklendi.",
      galeri: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Galeri görseli eklenirken hata:", error);

    res.status(500).json({
      message: "Galeri görseli eklenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

// Admin: Galeri görselini günceller
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      baslik,
      aciklama,
      resim_url,
      kategori,
      arac_id,
      siralama,
      kapak_mi,
      aktif,
    } = req.body;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("galeri_id", sql.Int, Number(id))
      .input("baslik", sql.NVarChar, baslik || null)
      .input("aciklama", sql.NVarChar, aciklama || null)
      .input("resim_url", sql.NVarChar, resim_url || null)
      .input("kategori", sql.NVarChar, kategori || null)
      .input("arac_id", sql.Int, arac_id ? Number(arac_id) : null)
      .input("siralama", sql.Int, siralama === undefined ? null : Number(siralama))
      .input("kapak_mi", sql.Bit, kapak_mi === undefined ? null : kapak_mi)
      .input("aktif", sql.Bit, aktif === undefined ? null : aktif)
      .query(`
        UPDATE dbo.Galeri
        SET
          baslik = ISNULL(@baslik, baslik),
          aciklama = ISNULL(@aciklama, aciklama),
          resim_url = ISNULL(@resim_url, resim_url),
          kategori = ISNULL(@kategori, kategori),
          arac_id = ISNULL(@arac_id, arac_id),
          siralama = ISNULL(@siralama, siralama),
          kapak_mi = ISNULL(@kapak_mi, kapak_mi),
          aktif = ISNULL(@aktif, aktif)
        OUTPUT INSERTED.*
        WHERE galeri_id = @galeri_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Güncellenecek galeri görseli bulunamadı.",
      });
    }

    res.json({
      message: "Galeri görseli başarıyla güncellendi.",
      galeri: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Galeri görseli güncellenirken hata:", error);

    res.status(500).json({
      message: "Galeri görseli güncellenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

// Admin: Galeri görselini siler/pasif hale getirir
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("galeri_id", sql.Int, Number(id))
      .query(`
        UPDATE dbo.Galeri
        SET aktif = 0
        OUTPUT INSERTED.*
        WHERE galeri_id = @galeri_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Silinecek galeri görseli bulunamadı.",
      });
    }

    res.json({
      message: "Galeri görseli başarıyla pasif hale getirildi.",
      galeri: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Galeri görseli silinirken hata:", error);

    res.status(500).json({
      message: "Galeri görseli silinirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

export default router;