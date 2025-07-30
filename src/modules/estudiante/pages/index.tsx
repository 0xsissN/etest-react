import { useAuthStore } from "../../../store/useAuthStore";
import EstudianteList from "../components/list";

const EstudiantePage = () => {
  const { logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
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

export default EstudiantePage;
