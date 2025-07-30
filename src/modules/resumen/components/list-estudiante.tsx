import { useEffect, useState } from "react";
import type { IEstudiante } from "../../../types/models";
import { getEstudiante } from "../../estudiante/services/estudiante-service";

const EstudianteList = () => {
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);

  const loadData = async () => {
    try {
      const response = await getEstudiante();
      setEstudiantes(response.data);
    } catch (err) {
      console.log("Error: ", err);
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EstudianteList;
