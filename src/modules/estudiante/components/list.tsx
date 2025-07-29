import { useEffect, useState } from "react";
import type { IEstudiante } from "../../../types/models";
import {
  deleteEstudiante,
  getEstudiante,
} from "../services/estudiante-service";
import { EstudiantePutForm } from "./form-put";
import { useAuthStore } from "../../../store/useAuthStore";
import { EstudiantePostForm } from "./form-post";

export const EstudianteList = () => {
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [estudiante, setEstudiante] = useState<IEstudiante | null>(null);
  const { rol } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [registroOpen, setRegistroOpen] = useState(false);

  const loadData = async () => {
    try {
      const response = await getEstudiante();
      setEstudiantes(response.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleDeleteEstudiante = async (ci: string) => {
    try {
      await deleteEstudiante(ci);
      loadData();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CI</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Fecha Nacimiento</th>
            <th>Estado</th>
            {rol === "Admin" && (
              <th colSpan={2}>
                <button
                  className="boton-registro"
                  onClick={() => setRegistroOpen(true)}
                >
                  Agregar Estudiante
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.ci}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellidoPaterno}</td>
              <td>{estudiante.apellidoMaterno}</td>
              <td>{estudiante.fechaNacimiento}</td>
              <td>{estudiante.estado ? "Activo" : "Desactivado"}</td>
              {rol === "Admin" && (
                <>
                  <td>
                    <button
                      className="boton-actualizado"
                      onClick={() => handleDeleteEstudiante(estudiante.ci)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <button
                      className="boton-actualizado"
                      onClick={() => {
                        setOpen(true);
                        setEstudiante(estudiante);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <EstudiantePutForm
          data={estudiante}
          onClose={() => setOpen(false)}
          onLoad={loadData}
        />
      )}

      {registroOpen && (
        <EstudiantePostForm
          onClose={() => setRegistroOpen(false)}
          onLoad={loadData}
        />
      )}
    </>
  );
};
