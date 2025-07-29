import api from "../../../services/api";

export const getCarreraByID = async (id: number) => {
  return await api.get(`/TestCarrera?id_test=${id}`);
};

export const postTestCarrera = async (
  test_codigo: string,
  carrera_id: number
) => {
  return await api.post(
    `/TestCarrera?test_codigo=${test_codigo}&carrera_id=${carrera_id}`
  );
};

export const deleteTestCarrera = async (
  test_id: number,
  carrera_id: number
) => {
  return await api.delete(
    `/TestCarrera?test_id=${test_id}&carrera_id=${carrera_id}`
  );
};
