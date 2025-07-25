export interface IColegio {
  id: number;
  codigo: string;
  nombre: string;
  direccion: string;
  estado: boolean;
}

export interface IEstudiante {
  id: number;
  ci: string;
  nombre: string;
  apellido_Paterno: string;
  apellido_Materno: string;
  fecha_Nacimiento: string;
  estado: boolean;
}

export interface ITestCarrera {
  id: number;
  codigo: string;
}

export interface iAuthState {
  token: string | null;
  username: string | null;
  rol: string | null;
  isAuthenticated: boolean;
  login: (token: string, username: string, rol: string) => void;
  logout: () => void;
}

export interface IAptitud {
  id: number;
  nombre: string;
}

export interface ICarrera {
  id: number;
  nombre: string;
}

export interface ICurso {
  id: number;
  nombre: string;
}

export interface ISeleccion {
  id: number;
  carreras: string;
}

export interface ITest {
  id: number;
  codigo: string;
  nombre_Estudiante: string;
  colegio: string;
  curso: string;
  estado: boolean;
  aptitudes: ISeleccion[];
  carreras: ISeleccion[];
}
