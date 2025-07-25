export interface IColegio{
    id: number;
    codigo: string;
    nombre: string;
    direccion: string;
}

export interface IEstudiante{
    id: number;
    ci: string;
    nombre: string;
    apellido_Paterno: string;
    apellido_Materno: string;
    fecha_Nacimiento: Date;
}

export interface ITestCarrera{
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
    id: number,
    nombre: string
}

export interface ICarrera {
    id: number,
    nombre: string
}

export interface ICurso{
    id: number,
    nombre: string
}