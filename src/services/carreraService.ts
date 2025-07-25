import api from "./api";

export const getCarreraByAptitud = async (id: number) => {
  const response = await api.get(`/Carrera?id_aptitud=${id}`);
  return response;
};
