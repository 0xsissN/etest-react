import api from "../../../services/api";
import type { ICurso } from "../../../types/models";

export const getCurso = async () => api.get<ICurso[]>("/Curso");
