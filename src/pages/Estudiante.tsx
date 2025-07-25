import { useEffect, useState } from "react";
import type { IEstudiante } from "../types/models";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import {
  deleteEstudiante,
  getEstudiante,
  postEstudiante,
  putEstudiante,
} from "../services/estudianteService";

const Estudiante = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [estudiante, setEstudiante] = useState<IEstudiante | null>(null);

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

  const handlePostEstudiante = async () => {
    try {
      await postEstudiante(
        ci,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento
      );
      alert("Exito");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDeleteEstudiante = async (e_ci: string) => {
    try {
      await deleteEstudiante(e_ci);
      loadData();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handlePutEstudiante = async (
    e_ci: string,
    e_nombre: string,
    e_apellidoPaterno: string,
    e_apellidoMaterno: string,
    e_fechaNacimiento: string,
    e_estado: boolean
  ) => {
    try {
      await putEstudiante(
        e_ci,
        e_nombre,
        e_apellidoPaterno,
        e_apellidoMaterno,
        e_fechaNacimiento,
        e_estado
      );
      loadData();
      setEditOpen(false);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const openEditModal = (estudiante: IEstudiante) => {
    setEstudiante(estudiante);
    setEditOpen(true);
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
            <th>Estado</th>
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
              <td>{estudiante.estado ? "Activo" : "Desactivado"}</td>
              <td>
                <button className="boton-actualizado" onClick={() => handleDeleteEstudiante(estudiante.ci)}>
                  Eliminar
                </button>
              </td>
              <td>
                <button className="boton-actualizado" onClick={() => openEditModal(estudiante)}>
                  Editar
                </button>
              </td>
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

            <form onSubmit={handlePostEstudiante}>
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

      {editOpen && estudiante && (
        <div className="modal-back">
          <div className="modal-content">
            <h2>Editar Estudiante</h2>
            <button className="modal-close" onClick={() => setEditOpen(false)}>
              &times;
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePutEstudiante(
                  estudiante.ci,
                  estudiante.nombre,
                  estudiante.apellido_Paterno,
                  estudiante.apellido_Materno,
                  estudiante.fecha_Nacimiento.toString(),
                  estudiante.estado
                );
              }}
            >
              <label htmlFor="edit-ci">
                CI:
                <input
                  id="edit-ci"
                  type="text"
                  value={estudiante.ci}
                  onChange={(e) =>
                    setEstudiante({
                      ...estudiante,
                      ci: e.target.value,
                    })
                  }
                  required
                  disabled
                />
              </label>

              <label htmlFor="edit-nombre">
                Nombre:
                <input
                  id="edit-nombre"
                  type="text"
                  value={estudiante.nombre}
                  onChange={(e) =>
                    setEstudiante({
                      ...estudiante,
                      nombre: e.target.value,
                    })
                  }
                  required
                />
              </label>

              <label htmlFor="edit-apellidoPaterno">
                Apellido Paterno:
                <input
                  id="edit-apellidoPaterno"
                  type="text"
                  value={estudiante.apellido_Paterno}
                  onChange={(e) =>
                    setEstudiante({
                      ...estudiante,
                      apellido_Paterno: e.target.value,
                    })
                  }
                  required
                />
              </label>

              <label htmlFor="edit-apellidoMaterno">
                Apellido Materno:
                <input
                  id="edit-apellidoMaterno"
                  type="text"
                  value={estudiante.apellido_Materno}
                  onChange={(e) =>
                    setEstudiante({
                      ...estudiante,
                      apellido_Materno: e.target.value,
                    })
                  }
                />
              </label>

              <label htmlFor="edit-fechaNacimiento">
                Fecha de Nacimiento:
                <input
                  id="edit-fechaNacimiento"
                  type="date"
                  value={estudiante.fecha_Nacimiento}
                  onChange={(e) =>
                    setEstudiante({
                      ...estudiante,
                      fecha_Nacimiento: e.target.value,
                    })
                  }
                />
              </label>

              <label htmlFor="edit-estado">
                Estado:
                <select
                  id="edit-estado"
                  value={estudiante.estado ? "true" : "false"}
                  onChange={(e) =>
                    setEstudiante({
                      ...estudiante,
                      estado: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </label>

              <button className="boton-guardar" type="submit">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estudiante;
