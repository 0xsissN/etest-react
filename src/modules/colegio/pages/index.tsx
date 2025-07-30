import { useAuthStore } from "../../../store/useAuthStore";
import ColegioList from "../components/list";

const ColegioPage = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="contenedor">
      <h1>Colegios</h1>
      <div className="descripcion">
        <button className="boton-registro" onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </div>
      <ColegioList />
    </div>
  );
};

export default ColegioPage;
