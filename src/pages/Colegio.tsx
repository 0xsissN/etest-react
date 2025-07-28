import { useEffect, useState } from "react";
import type { IColegio } from "../types/models";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import {
  deleteColegio,
  getColegio,
  postColegio,
  putColegio,
} from "../services/colegioService";
import { useForm, type SubmitHandler } from "react-hook-form";

const Colegio = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [colegio, setColegio] = useState<IColegio | null>(null);
  const [colegios, setColegios] = useState<IColegio[]>([]);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IColegio>();

  const { isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const loadData = async () => {
    try {
      const response = await getColegio();
      setColegios(response.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const onPostColegio: SubmitHandler<IColegio> = async (data) => {
    try {
      await postColegio(data);
      loadData();
      setOpen(false);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onPutColegio: SubmitHandler<IColegio> = async (data) => {
    try {
      const colegioActualizado = {
        ...data,
        estado: data.estado === true || data.estado === "true",
      };

      await putColegio(colegioActualizado);
      loadData();
      setEditOpen(false);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDeleteColegio = async (codigo: string) => {
    try {
      await deleteColegio(codigo);
      loadData();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const openEditModal = (data: IColegio) => {
    setColegio(data);
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
        <h1>Colegios</h1>
        <button className="boton-registro" onClick={() => setOpen(true)}>
          Agregar Colegio
        </button>
        <button className="boton-registro" onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Código</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {colegios.map((colegio) => (
            <tr key={colegio.id}>
              <td>{colegio.id}</td>
              <td>{colegio.nombre}</td>
              <td>{colegio.direccion}</td>
              <td>{colegio.codigo}</td>
              <td>{colegio.estado ? "Activo" : "Desactivado"}</td>
              <td>
                <button
                  className="boton-actualizado"
                  onClick={() => handleDeleteColegio(colegio.codigo)}
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  className="boton-actualizado"
                  onClick={() => openEditModal(colegio)}
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
            <h2>Formulario de Colegio</h2>
            <button className="modal-close" onClick={() => setOpen(false)}>
              &times;
            </button>

            <form onSubmit={handleSubmit(onPostColegio)}>
              <label htmlFor="nombre">
                Nombre:
                <input {...register("nombre")} />
              </label>

              <label htmlFor="direccion">
                Dirección:
                <input {...register("direccion")} />
              </label>

              <label htmlFor="codigo">
                Código:
                <input {...register("codigo")} />
              </label>

              <button className="boton-guardar" type="submit">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {editOpen && colegio && (
        <div className="modal-back">
          <div className="modal-content">
            <h2>Editar Colegio</h2>
            <button className="modal-close" onClick={() => setEditOpen(false)}>
              &times;
            </button>

            <form onSubmit={handleSubmit(onPutColegio)}>
              <label htmlFor="edit-nombre">
                Nombre:
                <input defaultValue={colegio.nombre} {...register("nombre")} />
              </label>

              <label htmlFor="edit-direccion">
                Dirección:
                <input
                  defaultValue={colegio.direccion}
                  {...register("direccion")}
                />
              </label>

              <label htmlFor="edit-codigo">
                Código:
                <input defaultValue={colegio.codigo} {...register("codigo")} />
              </label>

              <label htmlFor="edit-estado">
                Estado:
                <select
                  defaultValue={
                    colegio.estado === true ? "Activo" : "Desactivado"
                  }
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

export default Colegio;
