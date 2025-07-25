import type { ICurso } from "../types/models";
import api from "./api";

export const getCurso = async () => api.get<ICurso[]>("/Curso");
