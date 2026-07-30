SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- 1. ADIM: TABLOLARI OLUÞTUR
-- =============================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Adminler]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Adminler](
	[admin_id] [int] IDENTITY(1,1) NOT NULL,
	[kullanici_adi] [nvarchar](100) NOT NULL,
	[email] [nvarchar](150) NOT NULL,
	[sifre_hash] [nvarchar](255) NOT NULL,
	[aktif] [bit] NOT NULL DEFAULT ((1)),
	[olusturma_tarihi] [datetime] NOT NULL DEFAULT (getdate()),
	[son_giris_tarihi] [datetime] NULL,
PRIMARY KEY CLUSTERED ([admin_id] ASC)
)
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Araclar]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Araclar](
	[arac_id] [int] IDENTITY(1,1) NOT NULL,
	[arac_adi] [nvarchar](100) NOT NULL,
	[marka] [nvarchar](100) NULL,
	[model] [nvarchar](100) NULL,
	[kisi_kapasitesi] [int] NULL,
	[bagaj_kapasitesi] [int] NULL,
	[aciklama] [nvarchar](1000) NULL,
	[resim_url] [nvarchar](300) NULL,
	[aktif] [bit] NULL DEFAULT ((1)),
PRIMARY KEY CLUSTERED ([arac_id] ASC)
)
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AracOzellikleri]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[AracOzellikleri](
	[ozellik_id] [int] IDENTITY(1,1) NOT NULL,
	[arac_id] [int] NOT NULL,
	[ozellik_adi] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED ([ozellik_id] ASC)
)
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Galeri]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Galeri](
	[galeri_id] [int] IDENTITY(1,1) NOT NULL,
	[baslik] [nvarchar](100) NULL,
	[aciklama] [nvarchar](300) NULL,
	[resim_url] [nvarchar](300) NOT NULL,
	[kategori] [nvarchar](50) NULL,
	[arac_id] [int] NULL,
	[siralama] [int] NULL DEFAULT ((0)),
	[kapak_mi] [bit] NULL DEFAULT ((0)),
	[aktif] [bit] NULL DEFAULT ((1)),
	[eklenme_tarihi] [datetime] NULL DEFAULT (getdate()),
PRIMARY KEY CLUSTERED ([galeri_id] ASC)
)
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Hizmetler]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Hizmetler](
	[hizmet_id] [int] IDENTITY(1,1) NOT NULL,
	[hizmet_adi] [nvarchar](100) NOT NULL,
	[aciklama] [nvarchar](500) NULL,
	[aktif] [bit] NULL DEFAULT ((1)),
PRIMARY KEY CLUSTERED ([hizmet_id] ASC)
)
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Rezervasyonlar]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Rezervasyonlar](
	[rezervasyon_id] [int] IDENTITY(1,1) NOT NULL,
	[ad_soyad] [nvarchar](100) NOT NULL,
	[telefon] [nvarchar](20) NOT NULL,
	[email] [nvarchar](100) NULL,
	[hizmet_id] [int] NOT NULL,
	[rezervasyon_tarihi] [date] NOT NULL,
	[kisi_sayisi] [int] NOT NULL,
	[guzergah_not] [nvarchar](1000) NULL,
	[durum] [nvarchar](50) NULL DEFAULT ('Bekliyor'),
	[olusturma_tarihi] [datetime] NULL DEFAULT (getdate()),
	[rezervasyon_saati] [time](7) NULL,
	[alis_noktasi] [nvarchar](200) NULL,
	[varis_noktasi] [nvarchar](200) NULL,
	[arac_id] [int] NULL,
	[odeme_durumu] [nvarchar](50) NULL DEFAULT ('Ödenmedi'),
	[toplam_fiyat] [decimal](10, 2) NULL,
PRIMARY KEY CLUSTERED ([rezervasyon_id] ASC)
)
END
GO

-- UNIQUE INDEX
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = N'UQ_Adminler_Email' AND object_id = OBJECT_ID(N'[dbo].[Adminler]'))
BEGIN
    ALTER TABLE [dbo].[Adminler] ADD CONSTRAINT [UQ_Adminler_Email] UNIQUE NONCLUSTERED ([email] ASC)
END
GO

-- =============================================
-- 2. ADIM: VERÝLERÝ EKLE
-- =============================================

SET IDENTITY_INSERT [dbo].[Adminler] ON 
IF NOT EXISTS (SELECT 1 FROM [dbo].[Adminler] WHERE [admin_id] = 1)
BEGIN
    INSERT [dbo].[Adminler] ([admin_id], [kullanici_adi], [email], [sifre_hash], [aktif], [olusturma_tarihi], [son_giris_tarihi]) 
    VALUES (1, N'Admin', N'admin@gmail.com', N'$2b$10$cIEI1W.ZK3Vu3D6e4AcpKOr..Uael5hZb4SKK7Ch37qgAw5S7Kbvi', 1, CAST(N'2026-05-03T13:59:48.953' AS DateTime), CAST(N'2026-05-03T15:49:25.933' AS DateTime))
END
SET IDENTITY_INSERT [dbo].[Adminler] OFF
GO

SET IDENTITY_INSERT [dbo].[Hizmetler] ON 
IF NOT EXISTS (SELECT 1 FROM [dbo].[Hizmetler] WHERE [hizmet_id] = 1)
    INSERT [dbo].[Hizmetler] ([hizmet_id], [hizmet_adi], [aciklama], [aktif]) VALUES (1, N'Havalimaný Transferi', NULL, 1);
IF NOT EXISTS (SELECT 1 FROM [dbo].[Hizmetler] WHERE [hizmet_id] = 2)
    INSERT [dbo].[Hizmetler] ([hizmet_id], [hizmet_adi], [aciklama], [aktif]) VALUES (2, N'Kapadokya Özel Turu', NULL, 1);
IF NOT EXISTS (SELECT 1 FROM [dbo].[Hizmetler] WHERE [hizmet_id] = 3)
    INSERT [dbo].[Hizmetler] ([hizmet_id], [hizmet_adi], [aciklama], [aktif]) VALUES (3, N'Þehirlerarasý Transfer', NULL, 1);
IF NOT EXISTS (SELECT 1 FROM [dbo].[Hizmetler] WHERE [hizmet_id] = 4)
    INSERT [dbo].[Hizmetler] ([hizmet_id], [hizmet_adi], [aciklama], [aktif]) VALUES (4, N'Kurumsal Protokol', NULL, 1);
SET IDENTITY_INSERT [dbo].[Hizmetler] OFF
GO

SET IDENTITY_INSERT [dbo].[Rezervasyonlar] ON 
IF NOT EXISTS (SELECT 1 FROM [dbo].[Rezervasyonlar] WHERE [rezervasyon_id] = 3)
    INSERT [dbo].[Rezervasyonlar] ([rezervasyon_id], [ad_soyad], [telefon], [email], [hizmet_id], [rezervasyon_tarihi], [kisi_sayisi], [guzergah_not], [durum], [olusturma_tarihi], [rezervasyon_saati], [alis_noktasi], [varis_noktasi], [arac_id], [odeme_durumu], [toplam_fiyat]) 
    VALUES (3, N'Ceren Genç', N'5312033771', N'cerengenc589@gmail.com', 2, CAST(N'2026-01-01' AS Date), 1, NULL, N'Beklemede', CAST(N'2026-07-28T15:59:36.130' AS DateTime), CAST(N'20:00:00' AS Time), NULL, NULL, NULL, N'Ödenmedi', CAST(0.00 AS Decimal(10, 2)));

IF NOT EXISTS (SELECT 1 FROM [dbo].[Rezervasyonlar] WHERE [rezervasyon_id] = 4)
    INSERT [dbo].[Rezervasyonlar] ([rezervasyon_id], [ad_soyad], [telefon], [email], [hizmet_id], [rezervasyon_tarihi], [kisi_sayisi], [guzergah_not], [durum], [olusturma_tarihi], [rezervasyon_saati], [alis_noktasi], [varis_noktasi], [arac_id], [odeme_durumu], [toplam_fiyat]) 
    VALUES (4, N'ceren', N'5302033771', N'cerengenc589@gmail.com', 3, CAST(N'2000-01-01' AS Date), 1, NULL, N'Beklemede', CAST(N'2026-07-28T16:39:25.297' AS DateTime), CAST(N'20:00:00' AS Time), NULL, NULL, NULL, N'Ödenmedi', CAST(0.00 AS Decimal(10, 2)));

IF NOT EXISTS (SELECT 1 FROM [dbo].[Rezervasyonlar] WHERE [rezervasyon_id] = 5)
    INSERT [dbo].[Rezervasyonlar] ([rezervasyon_id], [ad_soyad], [telefon], [email], [hizmet_id], [rezervasyon_tarihi], [kisi_sayisi], [guzergah_not], [durum], [olusturma_tarihi], [rezervasyon_saati], [alis_noktasi], [varis_noktasi], [arac_id], [odeme_durumu], [toplam_fiyat]) 
    VALUES (5, N'Ceren Genç', N'5312033771', N'cerengenc589@gmail.com', 2, CAST(N'2003-01-01' AS Date), 1, NULL, N'Beklemede', CAST(N'2026-07-28T16:39:41.467' AS DateTime), CAST(N'20:00:00' AS Time), NULL, NULL, NULL, N'Ödenmedi', CAST(0.00 AS Decimal(10, 2)));

IF NOT EXISTS (SELECT 1 FROM [dbo].[Rezervasyonlar] WHERE [rezervasyon_id] = 6)
    INSERT [dbo].[Rezervasyonlar] ([rezervasyon_id], [ad_soyad], [telefon], [email], [hizmet_id], [rezervasyon_tarihi], [kisi_sayisi], [guzergah_not], [durum], [olusturma_tarihi], [rezervasyon_saati], [alis_noktasi], [varis_noktasi], [arac_id], [odeme_durumu], [toplam_fiyat]) 
    VALUES (6, N'Ceren Genç', N'5312033771', N'cerengenc589@gmail.com', 1, CAST(N'2000-01-01' AS Date), 1, NULL, N'Beklemede', CAST(N'2026-07-29T08:33:02.490' AS DateTime), CAST(N'20:00:00' AS Time), NULL, NULL, NULL, N'Ödenmedi', CAST(0.00 AS Decimal(10, 2)));
SET IDENTITY_INSERT [dbo].[Rezervasyonlar] OFF
GO

-- =============================================
-- 3. ADIM: ÝLÝÞKÝLER (FOREIGN KEYS)
-- =============================================

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AracOzellikleri_Araclar]'))
    ALTER TABLE [dbo].[AracOzellikleri] WITH CHECK ADD CONSTRAINT [FK_AracOzellikleri_Araclar] FOREIGN KEY([arac_id]) REFERENCES [dbo].[Araclar] ([arac_id]);
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Galeri_Araclar]'))
    ALTER TABLE [dbo].[Galeri] WITH CHECK ADD CONSTRAINT [FK_Galeri_Araclar] FOREIGN KEY([arac_id]) REFERENCES [dbo].[Araclar] ([arac_id]);
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Rezervasyonlar_Araclar]'))
    ALTER TABLE [dbo].[Rezervasyonlar] WITH CHECK ADD CONSTRAINT [FK_Rezervasyonlar_Araclar] FOREIGN KEY([arac_id]) REFERENCES [dbo].[Araclar] ([arac_id]);
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Rezervasyonlar_Hizmetler]'))
    ALTER TABLE [dbo].[Rezervasyonlar] WITH CHECK ADD CONSTRAINT [FK_Rezervasyonlar_Hizmetler] FOREIGN KEY([hizmet_id]) REFERENCES [dbo].[Hizmetler] ([hizmet_id]);
GO