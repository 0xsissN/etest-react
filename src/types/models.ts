export interface IColegio {
  id: number;
  codigo: string;
  nombre: string;
  direccion: string;
  estado: boolean | string;
}
export interface IEstudiante {
  id: number;
  ci: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  estado: boolean | string;
}
export interface IUsuario {
  username: string;
  password: string;
}
export interface ITest {
  id: number;
  codigo: string;
  estudianteCI: string;
  colegioCodigo: string;
  cursoID: string;
  nombreEstudiante: string;
  colegio: string;
  curso: string;
  estado: boolean | string;
  aptitudes: ISeleccion[];
  carreras: ISeleccion[];
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
