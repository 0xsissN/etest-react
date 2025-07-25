import type { IColegio } from "../types/models";
import api from "./api";

export const getColegio = () => api.get<IColegio[]>("/Colegio");

export const postColegio = async (
  codigo: string,
  nombre: string,
  direccion: string
) => {
  const response = await api.post(
    `/Colegio?codigo=${codigo}&nombre=${nombre}&direccion=${direccion}`
  );

  return response;
};

export const deleteColegio = async (codigo: string) => {
  const response = await api.delete(`/Colegio?codigo=${codigo}`);
  return response;
};

export const putColegio = async (
  codigo: string,
  nombre: string,
  direccion: string,
  estado: Boolean
) => {
  const response = await api.put(`/Colegio?codigo=${codigo}&nombre=${nombre}&direccion=${direccion}&estado=${estado}`)
  return response
};
