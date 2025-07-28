import type { ITest, ITesti } from "../types/models";
import api from "./api";

export const getTest = async () => await api.get<ITest[]>("/Test");

export const postTest = async (test: ITesti) => {
  const response = await api.post(
    `/Test?codigo=${test.codigo}&estudiante_ci=${test.estudiante_ci}&colegio_codigo=${test.colegio_codigo}&curso_id=${test.curso_id}&usuario_id=1`
  );
  return response;
};

export const deleteTest = async (id: string) => {
  const response = await api.delete(`/Test?codigo=${id}`);
  return response;
};

export const putTest = async (
  codigo: string,
  estudiante_ci: string,
  colegio_codigo: string,
  curso_id: string,
  estado: boolean
) => {
  const response = await api.put(
    `/Test?codigo=${codigo}&estudiante_ci=${estudiante_ci}&colegio_codigo=${colegio_codigo}&curso_id=${curso_id}&usuario_id=1&estado=${estado}`
  );
  return response;
};
