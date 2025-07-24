import api from './api'
import type { IEstudiante } from '../types/models';

export const getEstudiante = () => api.get<IEstudiante[]>("/Estudiante")

export const postEstudiante = (estudiante: Omit<IEstudiante, "id">) => api.post<IEstudiante>("/Estudiante", estudiante)
