import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import { TestCarreraList } from "../components/list";
import { TestFormPost } from "../components/test-form-post";
import { TestCarreraFormPost } from "../components/test-carrera-form-post";

export const TestCarreraPage = () => {
  const [open, setOpen] = useState(false);
  const [tcOpen, setTCOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

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
        <h1>Tests Carreras</h1>
        <button className="boton-registro" onClick={() => setOpen(true)}>
          Registrar Test
        </button>
        <button className="boton-registro" onClick={() => setTCOpen(true)}>
          Registrar Carreras
        </button>
        <button className="boton-registro" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <TestCarreraList />

      {open && <TestFormPost onClose={() => setOpen(false)} />}
      {tcOpen && <TestCarreraFormPost onClose={() => setTCOpen(false)} />}
    </div>
  );
};
