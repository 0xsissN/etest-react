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

const Colegio = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [colegio, setColegio] = useState<IColegio | null>(null);

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [colegios, setColegios] = useState<IColegio[]>([]);
  const navigate = useNavigate();

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

  const handlePostColegio = async () => {
    try {
      await postColegio(codigo, nombre, direccion);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDeleteColegio = async (c_codigo: string) => {
    try {
      await deleteColegio(c_codigo);
      loadData();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handlePutColegio = async (
    c_codigo: string,
    c_nombre: string,
    c_direccion: string,
    c_estado: boolean
  ) => {
    try {
      await putColegio(c_codigo, c_nombre, c_direccion, c_estado);
      loadData();
      setEditOpen(false);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const openEditModal = (colegio: IColegio) => {
    setColegio(colegio);
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
                <button className="boton-actualizado" onClick={() => handleDeleteColegio(colegio.codigo)}>
                  Eliminar
                </button>
              </td>
              <td>
                <button className="boton-actualizado" onClick={() => openEditModal(colegio)}>Editar</button>
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

            <form onSubmit={handlePostColegio}>
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

              <label htmlFor="direccion">
                Dirección:
                <input
                  id="direccion"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </label>

              <label htmlFor="codigo">
                Código:
                <input
                  id="codigo"
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  required
                />
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePutColegio(
                  colegio.codigo,
                  colegio.nombre,
                  colegio.direccion,
                  colegio.estado
                );
              }}
            >
              <label htmlFor="edit-nombre">
                Nombre:
                <input
                  id="edit-nombre"
                  type="text"
                  value={colegio.nombre}
                  onChange={(e) =>
                    setColegio({
                      ...colegio,
                      nombre: e.target.value,
                    })
                  }
                  required
                />
              </label>

              <label htmlFor="edit-direccion">
                Dirección:
                <input
                  id="edit-direccion"
                  type="text"
                  value={colegio.direccion}
                  onChange={(e) =>
                    setColegio({
                      ...colegio,
                      direccion: e.target.value,
                    })
                  }
                  required
                />
              </label>

              <label htmlFor="edit-codigo">
                Código:
                <input
                  id="edit-codigo"
                  type="text"
                  value={colegio.codigo}
                  onChange={(e) =>
                    setColegio({
                      ...colegio,
                      codigo: e.target.value,
                    })
                  }
                  required
                  disabled
                />
              </label>

              <label htmlFor="edit-estado">
                Estado:
                <select
                  id="edit-estado"
                  value={colegio.estado ? "true" : "false"}
                  onChange={(e) =>
                    setColegio({
                      ...colegio,
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

export default Colegio;
