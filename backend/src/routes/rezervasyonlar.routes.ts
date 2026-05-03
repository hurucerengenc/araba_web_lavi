import express from "express";
import sql from "mssql";
import { poolPromise } from "../config/db";
import { adminAuth } from "../middleware/auth.middleware";

const router = express.Router();

/*
  GET /api/rezervasyonlar
  Tüm rezervasyonları listeler.
*/
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT 
        r.rezervasyon_id,
        r.ad_soyad,
        r.telefon,
        r.email,
        r.hizmet_id,
        h.hizmet_adi,
        r.rezervasyon_tarihi,
        r.rezervasyon_saati,
        r.kisi_sayisi,
        r.guzergah_not,
        r.alis_noktasi,
        r.varis_noktasi,
        r.arac_id,
        a.arac_adi,
        r.durum,
        r.odeme_durumu,
        r.toplam_fiyat,
        r.olusturma_tarihi
      FROM dbo.Rezervasyonlar r
      LEFT JOIN dbo.Hizmetler h ON r.hizmet_id = h.hizmet_id
      LEFT JOIN dbo.Araclar a ON r.arac_id = a.arac_id
      ORDER BY r.olusturma_tarihi DESC
    `);

    res.json(result.recordset);
  } catch (error: any) {
    console.error("Rezervasyonlar listelenirken hata:", error);

    res.status(500).json({
      message: "Rezervasyonlar listelenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

/*
  GET /api/rezervasyonlar/:id
  Seçilen id'ye göre tek rezervasyon getirir.
*/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("rezervasyon_id", sql.Int, Number(id))
      .query(`
        SELECT 
          r.rezervasyon_id,
          r.ad_soyad,
          r.telefon,
          r.email,
          r.hizmet_id,
          h.hizmet_adi,
          r.rezervasyon_tarihi,
          r.rezervasyon_saati,
          r.kisi_sayisi,
          r.guzergah_not,
          r.alis_noktasi,
          r.varis_noktasi,
          r.arac_id,
          a.arac_adi,
          r.durum,
          r.odeme_durumu,
          r.toplam_fiyat,
          r.olusturma_tarihi
        FROM dbo.Rezervasyonlar r
        LEFT JOIN dbo.Hizmetler h ON r.hizmet_id = h.hizmet_id
        LEFT JOIN dbo.Araclar a ON r.arac_id = a.arac_id
        WHERE r.rezervasyon_id = @rezervasyon_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Rezervasyon bulunamadı.",
      });
    }

    res.json(result.recordset[0]);
  } catch (error: any) {
    console.error("Rezervasyon getirilirken hata:", error);

    res.status(500).json({
      message: "Rezervasyon getirilirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

/*
  POST /api/rezervasyonlar
  Yeni rezervasyon oluşturur.
*/
router.post("/", async (req, res) => {
  try {
    const {
      ad_soyad,
      telefon,
      email,
      hizmet_id,
      rezervasyon_tarihi,
      rezervasyon_saati,
      kisi_sayisi,
      guzergah_not,
      alis_noktasi,
      varis_noktasi,
      arac_id,
      odeme_durumu,
      toplam_fiyat,
    } = req.body;

    if (
      !ad_soyad ||
      !telefon ||
      !email ||
      !hizmet_id ||
      !rezervasyon_tarihi ||
      !rezervasyon_saati
    ) {
      return res.status(400).json({
        message: "Ad soyad, telefon, email, hizmet, tarih ve saat zorunludur.",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("ad_soyad", sql.NVarChar, ad_soyad)
      .input("telefon", sql.NVarChar, telefon)
      .input("email", sql.NVarChar, email)
      .input("hizmet_id", sql.Int, Number(hizmet_id))
      .input("rezervasyon_tarihi", sql.Date, rezervasyon_tarihi)

      // Saat frontend/PowerShell'den string gelir.
      // sql.Time hata verdiği için VarChar kullanıyoruz.
      // SQL Server time kolonuna "14:00:00" değerini kendi çevirebilir.
      .input("rezervasyon_saati", sql.VarChar, rezervasyon_saati)

      .input("kisi_sayisi", sql.Int, kisi_sayisi ? Number(kisi_sayisi) : 1)
      .input("guzergah_not", sql.NVarChar, guzergah_not || null)
      .input("alis_noktasi", sql.NVarChar, alis_noktasi || null)
      .input("varis_noktasi", sql.NVarChar, varis_noktasi || null)
      .input("arac_id", sql.Int, arac_id ? Number(arac_id) : null)
      .input("durum", sql.NVarChar, "Beklemede")
      .input("odeme_durumu", sql.NVarChar, odeme_durumu || "Ödenmedi")
      .input("toplam_fiyat", sql.Decimal(10, 2), toplam_fiyat ? Number(toplam_fiyat) : 0)
      .query(`
        INSERT INTO dbo.Rezervasyonlar (
          ad_soyad,
          telefon,
          email,
          hizmet_id,
          rezervasyon_tarihi,
          rezervasyon_saati,
          kisi_sayisi,
          guzergah_not,
          alis_noktasi,
          varis_noktasi,
          arac_id,
          durum,
          odeme_durumu,
          toplam_fiyat,
          olusturma_tarihi
        )
        OUTPUT INSERTED.*
        VALUES (
          @ad_soyad,
          @telefon,
          @email,
          @hizmet_id,
          @rezervasyon_tarihi,
          @rezervasyon_saati,
          @kisi_sayisi,
          @guzergah_not,
          @alis_noktasi,
          @varis_noktasi,
          @arac_id,
          @durum,
          @odeme_durumu,
          @toplam_fiyat,
          GETDATE()
        )
      `);

    res.status(201).json({
      message: "Rezervasyon başarıyla oluşturuldu.",
      rezervasyon: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Rezervasyon oluşturulurken hata:", error);

    res.status(500).json({
      message: "Rezervasyon oluşturulurken bir hata oluştu.",
      hata: error.message,
    });
  }
});

/*
  PUT /api/rezervasyonlar/:id
  Rezervasyonu günceller.
*/
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      ad_soyad,
      telefon,
      email,
      hizmet_id,
      rezervasyon_tarihi,
      rezervasyon_saati,
      kisi_sayisi,
      guzergah_not,
      durum,
      alis_noktasi,
      varis_noktasi,
      arac_id,
      odeme_durumu,
      toplam_fiyat,
    } = req.body;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("rezervasyon_id", sql.Int, Number(id))
      .input("ad_soyad", sql.NVarChar, ad_soyad || null)
      .input("telefon", sql.NVarChar, telefon || null)
      .input("email", sql.NVarChar, email || null)
      .input("hizmet_id", sql.Int, hizmet_id ? Number(hizmet_id) : null)
      .input("rezervasyon_tarihi", sql.Date, rezervasyon_tarihi || null)

      // Burası da POST ile aynı şekilde VarChar olmalı.
      // Yoksa rezervasyon güncellerken yine Invalid time hatası verir.
      .input("rezervasyon_saati", sql.VarChar, rezervasyon_saati || null)

      .input("kisi_sayisi", sql.Int, kisi_sayisi ? Number(kisi_sayisi) : null)
      .input("guzergah_not", sql.NVarChar, guzergah_not || null)
      .input("durum", sql.NVarChar, durum || null)
      .input("alis_noktasi", sql.NVarChar, alis_noktasi || null)
      .input("varis_noktasi", sql.NVarChar, varis_noktasi || null)
      .input("arac_id", sql.Int, arac_id ? Number(arac_id) : null)
      .input("odeme_durumu", sql.NVarChar, odeme_durumu || null)
      .input("toplam_fiyat", sql.Decimal(10, 2), toplam_fiyat ? Number(toplam_fiyat) : null)
      .query(`
        UPDATE dbo.Rezervasyonlar
        SET
          ad_soyad = ISNULL(@ad_soyad, ad_soyad),
          telefon = ISNULL(@telefon, telefon),
          email = ISNULL(@email, email),
          hizmet_id = ISNULL(@hizmet_id, hizmet_id),
          rezervasyon_tarihi = ISNULL(@rezervasyon_tarihi, rezervasyon_tarihi),
          rezervasyon_saati = ISNULL(@rezervasyon_saati, rezervasyon_saati),
          kisi_sayisi = ISNULL(@kisi_sayisi, kisi_sayisi),
          guzergah_not = ISNULL(@guzergah_not, guzergah_not),
          durum = ISNULL(@durum, durum),
          alis_noktasi = ISNULL(@alis_noktasi, alis_noktasi),
          varis_noktasi = ISNULL(@varis_noktasi, varis_noktasi),
          arac_id = ISNULL(@arac_id, arac_id),
          odeme_durumu = ISNULL(@odeme_durumu, odeme_durumu),
          toplam_fiyat = ISNULL(@toplam_fiyat, toplam_fiyat)
        OUTPUT INSERTED.*
        WHERE rezervasyon_id = @rezervasyon_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Güncellenecek rezervasyon bulunamadı.",
      });
    }

    res.json({
      message: "Rezervasyon başarıyla güncellendi.",
      rezervasyon: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Rezervasyon güncellenirken hata:", error);

    res.status(500).json({
      message: "Rezervasyon güncellenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

/*
  PATCH /api/rezervasyonlar/:id/durum
  Sadece rezervasyon durumunu günceller.
*/
router.patch("/:id/durum", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { durum } = req.body;

    if (!durum) {
      return res.status(400).json({
        message: "Durum bilgisi zorunludur.",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("rezervasyon_id", sql.Int, Number(id))
      .input("durum", sql.NVarChar, durum)
      .query(`
        UPDATE dbo.Rezervasyonlar
        SET durum = @durum
        OUTPUT INSERTED.*
        WHERE rezervasyon_id = @rezervasyon_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Rezervasyon bulunamadı.",
      });
    }

    res.json({
      message: "Rezervasyon durumu güncellendi.",
      rezervasyon: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Rezervasyon durumu güncellenirken hata:", error);

    res.status(500).json({
      message: "Rezervasyon durumu güncellenirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

/*
  DELETE /api/rezervasyonlar/:id
  Rezervasyonu siler.
*/
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("rezervasyon_id", sql.Int, Number(id))
      .query(`
        DELETE FROM dbo.Rezervasyonlar
        OUTPUT DELETED.*
        WHERE rezervasyon_id = @rezervasyon_id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Silinecek rezervasyon bulunamadı.",
      });
    }

    res.json({
      message: "Rezervasyon başarıyla silindi.",
      rezervasyon: result.recordset[0],
    });
  } catch (error: any) {
    console.error("Rezervasyon silinirken hata:", error);

    res.status(500).json({
      message: "Rezervasyon silinirken bir hata oluştu.",
      hata: error.message,
    });
  }
});

export default router;