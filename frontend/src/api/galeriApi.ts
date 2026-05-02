import api from "./axios";

export interface Galeri {
  galeri_id: number;
  baslik?: string;
  aciklama?: string;
  resim_url: string;
  durum?: string;
}

export const getGaleri = async () => {
  const response = await api.get<Galeri[]>("/galeri");
  return response.data;
};

export const getGaleriById = async (id: number) => {
  const response = await api.get<Galeri>(`/galeri/${id}`);
  return response.data;
};