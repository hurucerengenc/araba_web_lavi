import api from "./axios";

export interface Rezervasyon {
  rezervasyon_id: number;
  ad_soyad: string;
  telefon: string;
  email: string;
  hizmet_id: number;
  hizmet_adi?: string;
  rezervasyon_tarihi: string;
  rezervasyon_saati: string;
  kisi_sayisi: number;
  guzergah_not?: string;
  alis_noktasi?: string;
  varis_noktasi?: string;
  arac_id?: number;
  arac_adi?: string;
  durum?: string;
  odeme_durumu?: string;
  toplam_fiyat?: number;
  olusturma_tarihi?: string;
}

export interface RezervasyonCreate {
  ad_soyad: string;
  telefon: string;
  email: string;
  hizmet_id: number;
  rezervasyon_tarihi: string;
  rezervasyon_saati: string;
  kisi_sayisi: number;
  guzergah_not?: string;
  alis_noktasi?: string;
  varis_noktasi?: string;
  arac_id?: number | null;
  odeme_durumu?: string;
  toplam_fiyat?: number;
}

export const getRezervasyonlar = async () => {
  const response = await api.get<Rezervasyon[]>("/rezervasyonlar");
  return response.data;
};

export const getRezervasyonById = async (id: number) => {
  const response = await api.get<Rezervasyon>(`/rezervasyonlar/${id}`);
  return response.data;
};

export const createRezervasyon = async (data: RezervasyonCreate) => {
  const response = await api.post("/rezervasyonlar", data);
  return response.data;
};

export const updateRezervasyonDurum = async (id: number, durum: string) => {
  const response = await api.patch(`/rezervasyonlar/${id}/durum`, {
    durum,
  });

  return response.data;
};

export const deleteRezervasyon = async (id: number) => {
  const response = await api.delete(`/rezervasyonlar/${id}`);
  return response.data;
};