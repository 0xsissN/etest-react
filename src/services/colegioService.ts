import type { IColegio } from "../types/models";
import api from "./api";

export const getColegio = async () => api.get<IColegio[]>("/Colegio");

export const postColegio = async (colegio: IColegio) => {
  return await api.post(`/Colegio`, colegio);
};

export const deleteColegio = async (codigo: string) => {
  return await api.delete(`/Colegio?codigo=${codigo}`);
};

export const putColegio = async (colegio: IColegio) => {
  console.log(colegio);
  
  return await api.put(`/Colegio`, colegio);
};
