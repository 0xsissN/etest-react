import type { IColegio } from "../types/models";
import api from "./api";

export const getColegio = () => api.get<IColegio[]>("/Colegio");

export const postColegio = (colegio: Omit<IColegio, "id">) => api.post<IColegio>("/Colegio", colegio)