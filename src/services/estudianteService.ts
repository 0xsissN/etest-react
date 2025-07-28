import api from "./api";
import type { IEstudiante } from "../types/models";

export const getEstudiante = async () => api.get<IEstudiante[]>("/Estudiante");

export const postEstudiante = async (estudiante: IEstudiante) => {
  return await api.post(`/Estudiante`, estudiante);
};

export const deleteEstudiante = async (ci: string) => {
  return await api.delete(`/Estudiante?ci=${ci}`);
};

export const putEstudiante = async (estudiante: IEstudiante) => {
  return await api.put(`/Estudiante`, estudiante);
};
