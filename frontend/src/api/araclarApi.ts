import api from "./axios";

export interface Arac {
  arac_id: number;
  arac_adi: string;
  marka?: string;
  model?: string;
  yil?: number;
  kapasite?: number;
  fiyat?: number;
  resim_url?: string;
  durum?: string;
}

export const getAraclar = async () => {
  const response = await api.get<Arac[]>("/araclar");
  return response.data;
};

export const getAracById = async (id: number) => {
  const response = await api.get<Arac>(`/araclar/${id}`);
  return response.data;
};