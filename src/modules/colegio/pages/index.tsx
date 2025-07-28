import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { ColegioPostForm } from "../components/form-post";
import { ColegioList } from "../components/list";
import { useState } from "react";

export const ColegioPage = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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
      <ColegioList />

      {open && <ColegioPostForm onClose={() => setOpen(false)} />}
    </div>
  );
};
