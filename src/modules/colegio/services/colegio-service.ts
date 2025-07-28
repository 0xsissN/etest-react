import api from "../../../services/api";
import type { IColegio } from "../../../types/models";

export const getColegio = async () => api.get<IColegio[]>("/Colegio");

export const postColegio = async (colegio: IColegio) => {
  return await api.post(`/Colegio`, colegio);
};

export const deleteColegio = async (codigo: string) => {
  return await api.delete(`/Colegio?codigo=${codigo}`);
};

export const putColegio = async (colegio: IColegio) => { 
  return await api.put(`/Colegio`, colegio);
};
