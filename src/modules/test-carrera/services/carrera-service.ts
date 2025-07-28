import api from "../../../services/api";

export const getCarreraByAptitud = async (id: number) => {
  return await api.get(`/Carrera?id_aptitud=${id}`);
};
