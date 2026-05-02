import api from "./axios";

export interface Hizmet {
  hizmet_id: number;
  hizmet_adi: string;
  aciklama?: string;
  fiyat?: number;
  ikon?: string;
  durum?: string;
}

export const getHizmetler = async () => {
  const response = await api.get<Hizmet[]>("/hizmetler");
  return response.data;
};

export const getHizmetById = async (id: number) => {
  const response = await api.get<Hizmet>(`/hizmetler/${id}`);
  return response.data;
};