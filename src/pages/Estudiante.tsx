import { useEffect, useState } from "react";
import type { IEstudiante } from "../types/models";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import { getEstudiante } from "../services/estudianteService";

const Estudiante = () => {
  const [open, setOpen] = useState(false);
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="contenedor">
      <div className="descripcion">
        <h1>Estudiantes</h1>
        <button className="boton-registro" onClick={() => setOpen(true)}>
          Agregar Estudiante
        </button>
        <button className="boton-registro" onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CI</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Fecha Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.ci}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido_Paterno}</td>
              <td>{estudiante.apellido_Materno}</td>
              <td>{estudiante.fecha_Nacimiento.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="modal-back">
          <div className="modal-content">
            <h2>Formulario de Estudiante</h2>
            <button className="modal-close" onClick={() => setOpen(false)}>
              &times;
            </button>

            <form>
              <label htmlFor="ci">
                CI:
                <input
                  id="ci"
                  type="text"
                  value={ci}
                  onChange={(e) => setCi(e.target.value)}
                  required
                />
              </label>

              <label htmlFor="nombre">
                Nombre:
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>

              <label htmlFor="apellidoPaterno">
                Apellido Paterno:
                <input
                  id="apellidoPaterno"
                  type="text"
                  value={apellidoPaterno}
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  required
                />
              </label>

              <label htmlFor="apellidoMaterno">
                Apellido Materno:
                <input
                  id="apellidoMaterno"
                  type="text"
                  value={apellidoMaterno}
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                />
              </label>

              <label htmlFor="fechaNacimiento">
                Fecha de Nacimiento:
                <input
                  id="fechaNacimiento"
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </label>

              <button className="boton-guardar" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estudiante;
