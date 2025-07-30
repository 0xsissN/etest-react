import { useAuthStore } from "../../../store/useAuthStore";
import TestCarreraList from "../components/list";

const TestCarreraPage = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="contenedor">
      <h1>Tests Carreras</h1>
      <div className="descripcion">
        <button className="boton-registro" onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </div>
      <TestCarreraList />
    </div>
  );
};

export default TestCarreraPage;
