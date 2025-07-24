import { useEffect, useState } from "react";
import type { IColegio } from "../types/models";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import { getColegio, postColegio } from "../services/colegioService";

const Colegio = () => {
  const [open, setOpen] = useState(false);
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

  const handlePostColegio = async (e: React.FormEvent) => {
    e.preventDefault();
    await postColegio({ codigo, nombre, direccion });
    setCodigo("");
    setNombre("");
    setDireccion("");
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
          </tr>
        </thead>
        <tbody>
          {colegios.map((colegio) => (
            <tr key={colegio.id}>
              <td>{colegio.id}</td>
              <td>{colegio.nombre}</td>
              <td>{colegio.direccion}</td>
              <td>{colegio.codigo}</td>
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
    </div>
  );
};

export default Colegio;
