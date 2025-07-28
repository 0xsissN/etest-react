import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import { EstudianteList } from "../components/list";
import { EstudiantePostForm } from "../components/form-post";

export const EstudiantePage = () => {
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
        <h1>Estudiantes</h1>
        <button className="boton-registro" onClick={() => setOpen(true)}>
          Agregar Estudiante
        </button>
        <button className="boton-registro" onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </div>
      <EstudianteList />

      {open && <EstudiantePostForm onClose={() => setOpen(false)} />}
    </div>
  );
};
