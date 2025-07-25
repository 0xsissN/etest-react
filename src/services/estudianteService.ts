import api from "./api";
import type { IEstudiante } from "../types/models";

export const getEstudiante = async () => api.get<IEstudiante[]>("/Estudiante");

export const postEstudiante = async (
  ci: string,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  fecha_nacimiento: string
) => {
  const response = await api.post(
    `/Estudiante?ci=${ci}&nombre=${nombre}&apellido_paterno=${apellido_paterno}&apellido_materno=${apellido_materno}&fecha_nacimiento=${fecha_nacimiento}`
  );
  return response;
};

export const deleteEstudiante = async (ci: string) => {
  const response = await api.delete(`/Estudiante?ci=${ci}`);
  return response;
};

export const putEstudiante = async (
  ci: string,
  nombre: string,
  apellido_paterno: string,
  apellido_materno: string,
  fecha_nacimiento: string,
  estado: boolean
) => {
  const response = await api.put(
    `/Estudiante?ci=${ci}&nombre=${nombre}&apellido_paterno=${apellido_paterno}&apellido_materno=${apellido_materno}&fecha_nacimiento=${fecha_nacimiento}&estado=${estado}`
  );
  return response;
};
