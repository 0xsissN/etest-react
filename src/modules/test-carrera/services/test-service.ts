import api from "../../../services/api";
import type { ITest } from "../../../types/models";

export const getTest = async () => await api.get<ITest[]>("/Test");

export const postTest = async (test: ITest) => {
  return await api.post(
    `/Test?codigo=${test.codigo}&estudiante_ci=${test.estudianteCI}&colegio_codigo=${test.colegioCodigo}&curso_id=${test.cursoId}&usuario_id=1`
  );
};

export const deleteTest = async (id: string) => {
  return await api.delete(`/Test?codigo=${id}`);
};

export const putTest = async (test: ITest) => {
  return await api.put(
    `/Test?codigo=${test.codigo}&estudiante_ci=${test.estudianteCI}&colegio_codigo=${test.colegioCodigo}&curso_id=${test.cursoId}&estado=${test.estado}&usuario_id=1`
  );
};
