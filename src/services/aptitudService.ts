import type { IAptitud } from "../types/models";
import api from "./api";

export const getAptitud = () => api.get<IAptitud[]>("/Aptitud");

export const getAptitudByID = (id: number) => {
  const response = api.get(`/Aptitud/Id?id_test=${id}`);
  return response;
};
