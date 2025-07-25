import api from "./api";

export const getCarreraByID = async (id: number) => {
  const response = await api.get(`/TestCarrera?id_test=${id}`);
  return response;
};

export const postTestCarrera = async (
  test_codigo: string,
  carrera_id: string
) => {
  const response = await api.post(
    `/TestCarrera?test_codigo=${test_codigo}&carrera_id=${carrera_id}`
  );
  return response;
};
