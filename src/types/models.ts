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

export interface ITesti {
  id:number;
  codigo: string;
  estudiante_ci: string;
  colegio_codigo: string;
  curso_id: number;
  usuario_id: number;
  estado: boolean | string;
}

export interface ITestCarrera {

}

export interface ITest {
  id: number;
  codigo: string;
  ci: string;
  codigoColegio: string;
  cursoId: string;
  nombre_Estudiante: string;
  colegio: string;
  curso: string;
  estado: boolean;
  aptitudes: ISeleccion[];
  carreras: ISeleccion[];
}

export interface ILogin {
  username: string
  password: string
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

export interface Close{
  onClose: () => void
}
