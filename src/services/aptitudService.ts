import type { IAptitud } from "../types/models";
import api from "./api";

export const getAptitud = () => api.get<IAptitud[]>("/Aptitud");
