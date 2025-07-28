import api from "../../../services/api";
import type { IAptitud } from "../../../types/models";

export const getAptitud = () => api.get<IAptitud[]>("/Aptitud");

export const getAptitudByID = (id: number) => {
  return api.get(`/Aptitud/Id?id_test=${id}`);
};
