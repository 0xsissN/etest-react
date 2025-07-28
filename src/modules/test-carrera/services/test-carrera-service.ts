import api from "../../../services/api";
import type { IDTestCarrera, IPTestCarrera } from "../../../types/models";

export const getCarreraByID = async (id: number) => {
  return await api.get(`/TestCarrera?id_test=${id}`);
};

export const postTestCarrera = async (test_codigo: string, carrera_id: number) => {
  return await api.post(
    `/TestCarrera?test_codigo=${test_codigo}&carrera_id=${carrera_id}`
  );
};

export const deleteTestCarrera = async (testCarrera: IDTestCarrera) => {
  return await api.delete(
    `/TestCarrera?test_id=${testCarrera.test_id}&carrera_id=${testCarrera.carrera_id}`
  );
};
