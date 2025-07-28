import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import {
  deleteEstudiante,
  getEstudiante,
  postEstudiante,
  putEstudiante,
} from "../services/estudianteService";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IEstudiante } from "../types/models";

const Estudiante = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [estudiante, setEstudiante] = useState<IEstudiante | null>(null);

  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);

  const { register, handleSubmit } = useForm<IEstudiante>();

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

  const onPostEstudiante: SubmitHandler<IEstudiante> = async (data) => {
    try {
      await postEstudiante(data);
      setOpen(false);
      loadData();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onPutEstudiante: SubmitHandler<IEstudiante> = async (data) => {
    try {
      const estudianteActualizado = {
        ...data,
        estado: data.estado === true || data.estado === "true",
      };
      await putEstudiante(estudianteActualizado);
      setEditOpen(false);
      loadData();
    } catch (err) {
      console.log("Error:", err);
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
              <td>{estudiante.apellidoPaterno}</td>
              <td>{estudiante.apellidoMaterno}</td>
              <td>{estudiante.fechaNacimiento}</td>
              <td>{estudiante.estado ? "Activo" : "Desactivado"}</td>
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
                  onClick={() => openEditModal(estudiante)}
                >
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
            <button
              className="modal-close"
              onClick={() => {
                setOpen(false);
                setEstudiante(null);
              }}
            >
              &times;
            </button>

            <form onSubmit={handleSubmit(onPostEstudiante)}>
              <label htmlFor="ci">
                CI:
                <input {...register("ci")} />
              </label>

              <label htmlFor="nombre">
                Nombre:
                <input {...register("nombre")} />
              </label>

              <label htmlFor="apellidoPaterno">
                Apellido Paterno:
                <input {...register("apellidoPaterno")} />
              </label>

              <label htmlFor="apellidoMaterno">
                Apellido Materno:
                <input {...register("apellidoMaterno")} />
              </label>

              <label htmlFor="fechaNacimiento">
                Fecha de Nacimiento:
                <input {...register("fechaNacimiento")} type="date" />
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

            <form onSubmit={handleSubmit(onPutEstudiante)}>
              <label htmlFor="edit-ci">
                CI:
                <input defaultValue={estudiante.ci} {...register("ci")} />
              </label>

              <label htmlFor="edit-nombre">
                Nombre:
                <input
                  defaultValue={estudiante.nombre}
                  {...register("nombre")}
                />
              </label>

              <label htmlFor="edit-apellidoPaterno">
                Apellido Paterno:
                <input
                  defaultValue={estudiante.apellidoPaterno}
                  {...register("apellidoPaterno")}
                />
              </label>

              <label htmlFor="edit-apellidoMaterno">
                Apellido Materno:
                <input
                  defaultValue={estudiante.apellidoMaterno}
                  {...register("apellidoMaterno")}
                />
              </label>

              <label htmlFor="edit-fechaNacimiento">
                Fecha de Nacimiento:
                <input
                  defaultValue={estudiante.fechaNacimiento}
                  {...register("fechaNacimiento")}
                  type="date"
                />
              </label>

              <label htmlFor="edit-estado">
                Estado:
                <select
                  defaultValue={estudiante.estado ? "Activo" : "Desactivado"}
                  {...register("estado")}
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
