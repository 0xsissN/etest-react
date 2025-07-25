import api from "./api";

export const getCarreraByID = async (id: number) => {
  const response = await api.get(`/TestCarrera?id_test=${id}`);
  return response;
};

export const postTestCarrera = async (
  test_codigo: string,
  carrera_id: number
) => {
  const response = await api.post(
    `/TestCarrera?test_codigo=${test_codigo}&carrera_id=${carrera_id}`
  );
  return response;
};

export const deleteTestCarrera = async (
  test_id: number,
  carrera_id: number
) => {
  const response = await api.delete(
    `/TestCarrera?test_id=${test_id}&carrera_id=${carrera_id}`
  );
  return response;
};
