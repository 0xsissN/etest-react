import type { ITestCarrera } from "../types/models";
import api from "./api";

export const getTestCarrera = () => api.get<ITestCarrera[]>("/testCarrera");
