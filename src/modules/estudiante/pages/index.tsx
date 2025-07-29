import { useAuthStore } from "../../../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import { EstudianteList } from "../components/list";

export const EstudiantePage = () => {
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
      <h1>Estudiantes</h1>
      <div className="descripcion">
        <button className="boton-registro" onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </div>
      <EstudianteList />
    </div>
  );
};
