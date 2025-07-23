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