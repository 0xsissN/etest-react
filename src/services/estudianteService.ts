import api from './api'
import type { IEstudiante } from '../types/models';

export const getEstudiante = async () => api.get<IEstudiante[]>("/Estudiante")

export const postEstudiante = async (estudiante: Omit<IEstudiante, "id">) => api.post<IEstudiante>("/Estudiante", estudiante)
