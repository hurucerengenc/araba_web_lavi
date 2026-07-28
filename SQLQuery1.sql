USE VipTransferDB_new;
GO

SELECT * FROM dbo.Hizmetler;

USE VipTransferDB_new;
GO

INSERT INTO dbo.Hizmetler (hizmet_adi) -- Eðer sütun adýn hizmet_adi deðil de farklýysa (örn: ad) onu yazmalýsýn
VALUES 
('Havalimaný Transferi'),
('Kapadokya Özel Turu'),
('Þehirlerarasý Transfer'),
('Kurumsal Protokol');

SELECT * FROM dbo.Hizmetler;